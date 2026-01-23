import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { Doctor } from '../models/doctor.model';
import { DOCTORS } from '../data/mock-data';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    constructor(private http: HttpClient) { }

    getDoctors(): Observable<Doctor[]> {
        return of(DOCTORS).pipe(
            delay(500) // Simulate network latency
        );
    }

    getDoctorById(id: number): Observable<Doctor | undefined> {
        // Now works correctly with the in-memory constant
        return of(DOCTORS.find(d => d.id === id)).pipe(
            delay(300)
        );
    }
}
