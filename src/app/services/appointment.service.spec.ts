import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../models/appointment.model';

describe('AppointmentService', () => {
    let service: AppointmentService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AppointmentService]
        });
        service = TestBed.inject(AppointmentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve appointments from the API', () => {
        const dummyAppointments: Appointment[] = [
            { id: 1, patientId: 101, doctorId: 1, preferredDate: new Date().toISOString(), status: 'Pending', type: 'Routine Checkup', createdAt: new Date().toISOString() }
        ];

        service.getAppointments().subscribe(appointments => {
            expect(appointments.length).toBe(1);
            expect(appointments).toEqual(dummyAppointments);
        });

        const req = httpMock.expectOne('assets/mock-data/appointments.json');
        expect(req.request.method).toBe('GET');
        req.flush(dummyAppointments);
    });

    it('should create an appointment', () => {
        const newAppointment: Appointment = {
            id: 2, patientId: 102, doctorId: 2, preferredDate: new Date().toISOString(), status: 'Pending', type: 'Initial Consultation', createdAt: new Date().toISOString()
        };

        service.createAppointment(newAppointment).subscribe(appointment => {
            expect(appointment).toEqual(newAppointment);
        });

        // Since createAppointment uses `of()`, it won't make an HTTP request in the current implementation.
        // If it did, we would expect a POST request.
        // For now, we just verify the Observable emits the data.
    });
});
