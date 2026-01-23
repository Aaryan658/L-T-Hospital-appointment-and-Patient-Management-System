import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';
import { PATIENTS } from '../data/mock-data';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor() { }

    getPatientProfile(id?: number): Observable<Patient> {
        // Find patient by ID, or default to the first one (Demo mode)
        const patient = id ? PATIENTS.find(p => p.id === id) : PATIENTS[0];

        // Fallback if not found
        const responseData = patient || PATIENTS[0];

        return of(responseData);
    }

    getAllPatients(): Observable<Patient[]> {
        return of(PATIENTS);
    }
}
