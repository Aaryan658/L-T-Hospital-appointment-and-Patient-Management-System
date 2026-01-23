import { Doctor } from '../models/doctor.model';

export const MOCK_DOCTORS: Doctor[] = [
    {
        id: 1,
        name: 'Dr. Sarah Smith',
        specialization: 'Cardiology',
        qualification: 'MBBS, MD (Cardiology)',
        department: 'Cardiology',
        status: 'Available',
        availabilityStatus: 'Available',
        experience: 12,
        consultationFee: 150,
        clinicRoom: 'Rm-304',
        createdAt: '2023-01-15T09:00:00Z'
    },
    {
        id: 2,
        name: 'Dr. Michael Johnson',
        specialization: 'Neurology',
        qualification: 'MBBS, DM (Neurology)',
        department: 'Neurology',
        status: 'On Leave',
        availabilityStatus: 'On Leave',
        experience: 8,
        consultationFee: 200,
        clinicRoom: 'Rm-202',
        createdAt: '2023-03-10T14:30:00Z'
    },
    {
        id: 3,
        name: 'Dr. Emily Williams',
        specialization: 'Pediatrics',
        qualification: 'MBBS, DCH',
        department: 'Pediatrics',
        status: 'Available',
        availabilityStatus: 'Available',
        experience: 15,
        consultationFee: 100,
        clinicRoom: 'Rm-105',
        createdAt: '2022-11-20T11:00:00Z'
    },
    {
        id: 4,
        name: 'Dr. James Brown',
        specialization: 'Orthopedics',
        qualification: 'MBBS, MS (Ortho)',
        department: 'Orthopedics',
        status: 'Busy',
        availabilityStatus: 'Busy',
        experience: 20,
        consultationFee: 180,
        clinicRoom: 'Rm-401',
        createdAt: '2022-08-05T08:15:00Z'
    }
];
