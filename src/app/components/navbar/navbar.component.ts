import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, UserRole } from '../../services/auth.service';
import { Observable, combineLatest, filter, map, startWith } from 'rxjs';

interface NavItem {
    label: string;
    path?: string;
    action?: string;
}

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    navItems$: Observable<NavItem[]>;

    constructor(private authService: AuthService, private router: Router) {
        const url$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => (event as NavigationEnd).urlAfterRedirects || (event as NavigationEnd).url),
            startWith(this.router.url)
        );

        this.navItems$ = combineLatest([this.authService.userRole$, url$]).pipe(
            map(([role, url]) => {
                if (url.includes('/login')) {
                    return [];
                }
                return this.getNavItems(role);
            })
        );
    }

    ngOnInit() { }

    private getNavItems(role: UserRole): NavItem[] {
        if (!role) {
            return [
                { label: 'Login', path: '/login' }
            ];
        } else if (role === 'patient') {
            return [
                { label: 'Doctors', path: '/doctors' },
                { label: 'Appointments', path: '/appointments' },
                { label: 'Patient Dashboard', path: '/patient-dashboard' },
                { label: 'Logout', action: 'logout' }
            ];
        } else if (role === 'doctor') {
            return [
                { label: 'Doctor Dashboard', path: '/doctor-dashboard' },
                { label: 'Logout', action: 'logout' }
            ];
        }
        return [];
    }

    onItemClick(item: NavItem) {
        if (item.action === 'logout') {
            this.authService.logout();
        }
    }
}
