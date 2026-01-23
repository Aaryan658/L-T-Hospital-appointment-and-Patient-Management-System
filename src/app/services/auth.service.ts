import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export type UserRole = 'patient' | 'doctor' | null;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userRoleSubject = new BehaviorSubject<UserRole>(this.getInitialRole());
    public userRole$ = this.userRoleSubject.asObservable();

    constructor(private router: Router) { }

    private getInitialRole(): UserRole {
        return localStorage.getItem('userRole') as UserRole;
    }

    login(role: 'patient' | 'doctor', id: string) {
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', id);
        this.userRoleSubject.next(role);

        if (role === 'patient') {
            this.router.navigate(['/patient-dashboard']);
        } else {
            this.router.navigate(['/doctor-dashboard']);
        }
    }

    logout() {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        this.userRoleSubject.next(null);
        this.router.navigate(['/login']);
    }

    getCurrentRole(): UserRole {
        return this.userRoleSubject.value;
    }

    getUserId(): string | null {
        return localStorage.getItem('userId');
    }
}
