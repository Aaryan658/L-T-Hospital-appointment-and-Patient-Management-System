import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model';
import { APPOINTMENTS } from '../data/mock-data';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    // In-memory state management for session persistence
    private appointments: Appointment[] = [...APPOINTMENTS];
    private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.appointments);

    constructor(private http: HttpClient) { }

    getAppointments(): Observable<Appointment[]> {
        return this.appointmentsSubject.asObservable();
    }

    createAppointment(appointment: Appointment): Observable<Appointment> {
        // Simulate backend ID generation and delay
        appointment.id = this.appointments.length > 0 ? Math.max(...this.appointments.map(a => a.id)) + 1 : 101;
        appointment.createdAt = new Date().toISOString();
        appointment.status = 'Requested'; // Ensure default status

        this.appointments = [...this.appointments, appointment];
        this.appointmentsSubject.next(this.appointments);

        return of(appointment).pipe(delay(500));
    }

    updateAppointmentStatus(id: number, status: 'Approved' | 'Rejected' | 'Cancelled'): Observable<Appointment | undefined> {
        const index = this.appointments.findIndex(a => a.id === id);
        if (index !== -1) {
            const updatedAppointment = { ...this.appointments[index], status };
            this.appointments[index] = updatedAppointment;
            this.appointments = [...this.appointments]; // Immutable update
            this.appointmentsSubject.next(this.appointments);
            return of(updatedAppointment).pipe(delay(300));
        }
        return of(undefined);
    }
}
