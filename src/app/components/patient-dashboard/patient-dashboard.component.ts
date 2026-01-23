import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../models/appointment.model';
import { Doctor } from '../../models/doctor.model';
import { Patient } from '../../models/patient.model';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-patient-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatTabsModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        RouterLink
    ],
    templateUrl: './patient-dashboard.component.html',
    styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
    appointments: Appointment[] = [];
    doctors: Doctor[] = [];
    displayedColumns: string[] = ['doctor', 'date', 'status'];

    patient: Patient | undefined;

    constructor(
        private appointmentService: AppointmentService,
        private doctorService: DoctorService,
        private patientService: PatientService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.doctorService.getDoctors().subscribe(data => this.doctors = data);
        this.appointmentService.getAppointments().subscribe(data => this.appointments = data);

        const userId = this.authService.getUserId() || '1';
        this.patientService.getPatientProfile(+userId).subscribe(data => {
            this.patient = data;
        });
    }

    getDoctorName(doctorId: number): string {
        const doctor = this.doctors.find(d => d.id === doctorId);
        return doctor ? doctor.name : 'Unknown Doctor';
    }
}
