import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Doctor } from '../../models/doctor.model';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-appointment-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule
    ],
    templateUrl: './appointment-form.component.html',
    styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnChanges {
    @Input() doctors: Doctor[] = [];
    @Input() selectedDoctorId: number | null = null;

    private fb = inject(FormBuilder);
    private appointmentService = inject(AppointmentService);
    private authService = inject(AuthService);
    private router = inject(Router);

    // Mock patient name for display - in real app, fetch from profile
    patientName: string = 'John Doe';

    appointmentForm: FormGroup = this.fb.group({
        patientName: [{ value: this.patientName, disabled: true }],
        doctorId: ['', Validators.required],
        preferredDate: ['', [Validators.required, this.futureDateValidator]],
        reason: ['', Validators.required]
    });

    get availableDoctors() {
        return this.doctors.filter(d => d.status === 'Available');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['selectedDoctorId'] && this.selectedDoctorId) {
            this.appointmentForm.patchValue({ doctorId: this.selectedDoctorId });
        }
    }

    futureDateValidator(control: any) {
        if (!control.value) return null;
        const inputDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today ? null : { pastDate: true };
    }

    onSubmit() {
        if (this.appointmentForm.valid) {
            const formValue = this.appointmentForm.getRawValue(); // Get raw value to include disabled fields
            const patientIdStr = this.authService.getUserId();
            const patientId = patientIdStr ? parseInt(patientIdStr, 10) : 0;

            const newAppointment = {
                id: Math.floor(Math.random() * 10000),
                patientId: patientId,
                doctorId: formValue.doctorId,
                preferredDate: new Date(formValue.preferredDate).toISOString(),
                status: 'Requested' as const,
                type: 'Initial Consultation' as const,
                reason: formValue.reason,
                createdAt: new Date().toISOString()
            };

            this.appointmentService.createAppointment(newAppointment).subscribe(() => {
                alert('Appointment Request Submitted Successfully!');
                this.router.navigate(['/patient-dashboard']);
            });
        } else {
            this.appointmentForm.markAllAsTouched();
        }
    }
}
