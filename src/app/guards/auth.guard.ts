import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    // Simulation: Check localStorage or a mock auth state
    const userRole = localStorage.getItem('userRole'); // 'patient' | 'doctor' | null

    const expectedRole = route.data['role'];

    if (!userRole) {
        return router.createUrlTree(['/login']);
    }

    if (expectedRole && userRole !== expectedRole) {
        // Redirect to appropriate dashboard if role mismatch
        if (userRole === 'patient') return router.createUrlTree(['/patient-dashboard']);
        if (userRole === 'doctor') return router.createUrlTree(['/doctor-dashboard']);
        return false;
    }

    return true;
};
