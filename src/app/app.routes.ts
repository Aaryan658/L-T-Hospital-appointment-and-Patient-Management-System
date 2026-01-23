import { Routes } from '@angular/router';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    {
        path: 'doctors',
        component: DoctorsPageComponent,
        canActivate: [authGuard],
        data: { role: 'patient' } // Assuming patients view doctors
    },
    {
        path: 'appointments',
        component: AppointmentPageComponent,
        canActivate: [authGuard],
        data: { role: 'patient' }
    },
    {
        path: 'patient-dashboard',
        component: PatientDashboardComponent,
        canActivate: [authGuard],
        data: { role: 'patient' }
    },
    {
        path: 'doctor-dashboard',
        component: DoctorDashboardComponent,
        canActivate: [authGuard],
        data: { role: 'doctor' }
    }
];
