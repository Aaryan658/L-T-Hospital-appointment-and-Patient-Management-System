import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DoctorService } from './doctor.service';
import { Doctor } from '../models/doctor.model';

describe('DoctorService', () => {
    let service: DoctorService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DoctorService]
        });
        service = TestBed.inject(DoctorService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve doctors from the API', () => {
        const dummyDoctors: Doctor[] = [
            { id: 1, name: 'Dr. Smith', specialization: 'Cardiology', status: 'Available', experience: 10, createdAt: new Date().toISOString() },
            { id: 2, name: 'Dr. Jones', specialization: 'General Practice', status: 'Off Duty', experience: 5, createdAt: new Date().toISOString() }
        ];

        service.getDoctors().subscribe(doctors => {
            expect(doctors.length).toBe(2);
            expect(doctors).toEqual(dummyDoctors);
        });

        const req = httpMock.expectOne('assets/mock-data/doctors.json');
        expect(req.request.method).toBe('GET');
        req.flush(dummyDoctors);
    });

    it('should retrieve a doctor by ID', () => {
        const dummyDoctors: Doctor[] = [
            { id: 1, name: 'Dr. Smith', specialization: 'Cardiology', status: 'Available', experience: 10, createdAt: new Date().toISOString() }
        ];

        service.getDoctorById(1).subscribe(doctor => {
            expect(doctor).toBeTruthy();
            expect(doctor?.name).toBe('Dr. Smith');
        });

        const req = httpMock.expectOne('assets/mock-data/doctors.json');
        expect(req.request.method).toBe('GET');
        req.flush(dummyDoctors);
    });
});
