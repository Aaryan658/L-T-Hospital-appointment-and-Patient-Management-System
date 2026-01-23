/**
 * Represents a patient registered in the hospital management system.
 * 
 * Contains personal demographics and high-level medical background.
 * Used for appointment bookings and dashboard displays.
 */
export interface Patient {
    /** Unique identifier for the patient */
    id: number;

    /** Full legal name */
    name: string;

    /** Contact email address */
    email: string;

    /** Primary contact phone number */
    contactNumber: string;

    /** Patient's Age */
    age: number;

    /** Gender for medical records */
    gender: 'Male' | 'Female' | 'Other';

    /** Blood Group (e.g. 'A+', 'O-') */
    bloodGroup: string;

    /** Residential City or Location */
    city: string;

    /** Short summary of current primary condition */
    conditionSummary: string;

    /** Simplified array of past diagnoses or conditions */
    medicalHistory: string[];

    /** ISO timestamp of registration */
    createdAt: string;

    /** Account status */
    isActive: boolean;
}
