/**
 * Represents a medical professional within the hospital system.
 * 
 * This model defines the core attributes of a doctor, including their
 * specialization, availability status, and biographical data.
 * It is a pure data contract used throughout the application.
 */
export interface Doctor {
    /** Unique identifier for the doctor */
    id: number;

    /** Full professional name (e.g., "Dr. John Smith") */
    name: string;

    /** Medical field of expertise */
    specialization: 'Cardiology' | 'Neurology' | 'Pediatrics' | 'Orthopedics' | 'General Practice';

    /** Current working status */
    status: 'Available' | 'Busy' | 'On Leave' | 'Off Duty';

    /** Years of professional medical practice */
    experience: number;

    /** Professional Qualifications (e.g. MBBS, MD, FRCS) */
    qualification: string;

    /** Specific Department (e.g. Cardiology, Neurology) */
    department: string;

    /** Detailed availability status */
    availabilityStatus: 'Available' | 'On Leave' | 'Busy' | 'Off Duty';

    /** Consultation fee in currency (display only) */
    consultationFee?: number;

    /** Assigned clinic room number */
    clinicRoom?: string;

    /** URL to profile image (optional) */
    imageUrl?: string;



    /** ISO timestamp of when the doctor record was created */
    createdAt: string;
}
