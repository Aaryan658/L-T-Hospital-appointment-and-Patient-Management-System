/**
 * Represents a scheduled interaction between a Patient and a Doctor.
 * 
 * This entity links the two primary actors and tracks the status
 * of the consultation lifecycle.
 */
export interface Appointment {
    /** Unique appointment identifier */
    id: number;

    /** FLKey: Reference to the Patient entity */
    patientId: number;

    /** FLKey: Reference to the Doctor entity */
    doctorId: number;

    /** Scheduled date and time (ISO string) - Preferred Date for request */
    preferredDate: string;

    /** Current state of the appointment workflow */
    status: 'Requested' | 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

    /** Type of visit */
    type: 'Initial Consultation' | 'Follow-up' | 'Routine Checkup' | 'Emergency';

    /** Optional notes or reason provided by the patient */
    reason?: string;

    /** Timestamp of record creation */
    createdAt: string;
}
