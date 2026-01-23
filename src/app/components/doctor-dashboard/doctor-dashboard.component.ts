import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';
import { Doctor } from '../../models/doctor.model';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
    selector: 'app-doctor-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatChipsModule,
        MatSnackBarModule,
        MatIconModule,
        MatDividerModule,
        MatTableModule
    ],
    templateUrl: './doctor-dashboard.component.html',
    styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
    today = new Date();
    doctorName = 'Dr. Smith'; // Will be replaced by actual data
    appointments: Appointment[] = [];
    patients: Patient[] = [];
    displayedColumns: string[] = ['patient', 'date', 'reason', 'status'];
    doctor: Doctor | undefined;

    constructor(
        private appointmentService: AppointmentService,
        private patientService: PatientService,
        private snackBar: MatSnackBar,
        private authService: AuthService,
        private doctorService: DoctorService
    ) { }

    ngOnInit() {
        this.patientService.getAllPatients().subscribe(data => this.patients = data);
        this.appointmentService.getAppointments().subscribe(data => this.appointments = data);

        let userId = this.authService.getUserId();
        // Robust fallback: if null, empty, or NaN, default to '1'
        if (!userId || isNaN(+userId)) {
            userId = '1';
        }

        this.doctorService.getDoctorById(+userId).subscribe(data => {
            this.doctor = data;

            // If ID returned nothing (e.g. ID 99 exists in LS but not in mock data), retry with ID 1
            if (!this.doctor) {
                this.doctorService.getDoctorById(1).subscribe(fallbackData => {
                    this.doctor = fallbackData;
                    if (this.doctor) {
                        this.doctorName = this.doctor.name;
                        this.filterAppointmentsForDoctor(this.doctor.id);
                    }
                });
            } else {
                this.doctorName = this.doctor.name;
                this.filterAppointmentsForDoctor(this.doctor.id);
            }
        });
    }

    filterAppointmentsForDoctor(doctorId: number) {
        // Filter global appointments to show only those for this doctor
        this.appointmentService.getAppointments().subscribe(allAppointments => {
            this.appointments = allAppointments.filter(a => a.doctorId === doctorId);
        });
    }

    getPatientName(patientId: number): string {
        const patient = this.patients.find(p => p.id === patientId);
        return patient ? patient.name : `Patient #${patientId}`;
    }

    getPatient(patientId: number): Patient | undefined {
        return this.patients.find(p => p.id === patientId);
    }

    get pendingAppointments() {
        return this.appointments.filter(a => a.status === 'Requested');
    }

    get scheduledAppointments() {
        return this.appointments.filter(a => a.status === 'Approved');
    }

    approveRequest(appointment: Appointment) {
        this.appointmentService.updateAppointmentStatus(appointment.id, 'Approved').subscribe(() => {
            this.snackBar.open(`Appointment for ${this.getPatientName(appointment.patientId)} APPROVED`, 'Close', {
                duration: 3000,
                panelClass: ['success-snackbar']
            });
            // Refresh data implied by binding to service, or simple local update if using observables properly.
            // Since we re-fetch in ngOnInit, we might want to manually update list or just rely on the filter.
            // The service call updates backend. Local array 'appointments' is in-memory.
            // We should update the local array item's status for immediate UI feedback.
            const index = this.appointments.findIndex(a => a.id === appointment.id);
            if (index !== -1) {
                this.appointments[index].status = 'Approved';
            }
        });
    }

    rejectRequest(appointment: Appointment) {
        this.appointmentService.updateAppointmentStatus(appointment.id, 'Rejected').subscribe(() => {
            this.snackBar.open(`Appointment for ${this.getPatientName(appointment.patientId)} REJECTED`, 'Close', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
            const index = this.appointments.findIndex(a => a.id === appointment.id);
            if (index !== -1) {
                this.appointments[index].status = 'Rejected';
            }
        });
    }
}
