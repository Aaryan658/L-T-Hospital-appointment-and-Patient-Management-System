import { Appointment } from '../models/appointment.model';

export const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: 101,
        patientId: 1,
        doctorId: 1,
        preferredDate: '2023-11-15T10:00:00',
        status: 'Pending',
        type: 'Initial Consultation',
        createdAt: '2024-10-20T10:00:00Z'
    },
    {
        id: 102,
        patientId: 2,
        doctorId: 1,
        preferredDate: '2024-10-26T14:00:00',
        status: 'Pending',
        type: 'Follow-up',
        reason: 'Post-surgery checkup',
        createdAt: '2024-10-22T15:45:00Z'
    }
];
