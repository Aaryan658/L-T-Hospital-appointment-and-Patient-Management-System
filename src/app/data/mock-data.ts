import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';
import { Patient } from '../models/patient.model';

export const PATIENTS: Patient[] = [
    {
        id: 1,
        name: 'John Mathew',
        email: 'john.mathew@example.com',
        contactNumber: '9876543210',
        age: 34,
        gender: 'Male',
        bloodGroup: 'O+',
        city: 'New York',
        conditionSummary: 'Hypertension',
        medicalHistory: ['Hypertension', 'Seasonal Allergies'],
        createdAt: '2023-01-10T09:00:00Z',
        isActive: true
    },
    {
        id: 2,
        name: 'Emma Watson',
        email: 'emma.watson@example.com',
        contactNumber: '8765432109',
        age: 28,
        gender: 'Female',
        bloodGroup: 'A-',
        city: 'Los Angeles',
        conditionSummary: 'Migraine',
        medicalHistory: ['Migraine', 'Vitamin D Deficiency'],
        createdAt: '2023-02-15T14:30:00Z',
        isActive: true
    },
    {
        id: 3,
        name: 'Michael Jordan',
        email: 'michael.j@example.com',
        contactNumber: '7654321098',
        age: 45,
        gender: 'Male',
        bloodGroup: 'B+',
        city: 'Chicago',
        conditionSummary: 'Sports Injury',
        medicalHistory: ['Knee Surgery', 'Asthma'],
        createdAt: '2023-03-20T11:00:00Z',
        isActive: true
    }
];

export const DOCTORS: Doctor[] = [
    {
        id: 1,
        name: 'Dr. Sarah Smith',
        specialization: 'Cardiology',
        qualification: 'MBBS, MD (Cardiology)',
        department: 'Cardiology',
        status: 'Available',
        availabilityStatus: 'Available',
        experience: 15,
        consultationFee: 150,
        clinicRoom: 'Rm-304',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: 'Dr. John Doe',
        specialization: 'Neurology',
        qualification: 'MBBS, DM (Neurology)',
        department: 'Neurology',
        status: 'On Leave',
        availabilityStatus: 'On Leave',
        experience: 8,
        consultationFee: 200,
        clinicRoom: 'Rm-202',
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: 'Dr. Emily Williams',
        specialization: 'Pediatrics',
        qualification: 'MBBS, DCH',
        department: 'Pediatrics',
        status: 'Available',
        availabilityStatus: 'Available',
        experience: 12,
        consultationFee: 100,
        clinicRoom: 'Rm-105',
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        name: 'Dr. Michael Brown',
        specialization: 'Orthopedics',
        qualification: 'MBBS, MS (Ortho)',
        department: 'Orthopedics',
        status: 'Busy',
        availabilityStatus: 'Busy',
        experience: 20,
        consultationFee: 180,
        clinicRoom: 'Rm-401',
        createdAt: new Date().toISOString()
    }
];

export const APPOINTMENTS: Appointment[] = [
    {
        id: 101,
        patientId: 1,
        doctorId: 1,
        preferredDate: '2026-01-24T10:30:00', // Static date/time
        status: 'Requested',
        type: 'Initial Consultation',
        reason: 'Chest pain and fatigue',
        createdAt: '2026-01-20T09:00:00'
    },
    {
        id: 102,
        patientId: 1,
        doctorId: 3,
        preferredDate: '2026-01-27T14:00:00', // Static date/time
        status: 'Approved',
        type: 'Routine Checkup',
        reason: 'Annual physical for child',
        createdAt: '2026-01-15T10:00:00'
    }
];
