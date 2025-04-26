import type { IntakeFormResponse } from './types';

export const patientIntakeResponse: IntakeFormResponse = {
  patientId: "P12345",
  formId: "INTAKE-2025-04-01",
  submissionDate: "2025-04-25T14:30:22Z",
  type: "med_card",
  tag: "new",
  formComplete: true,
  responses: {
    "bio": {
      "first_name": "John",
      "middle_name": "Michael",
      "last_name": "Doe"
    },
    "dob": {
      "date_of_birth": "1985-06-15"
    },
    "address_details": {
      "address_street": "123 Main Street",
      "address_apt": "Apt 4B",
      "address_city": "Boston",
      "address_state": "MA",
      "address_zip": "02108"
    },
    "contact_info": {
      "phone_primary": "6175551234",
      "phone_alternative": "6175555678"
    },
    "minor_info": {
      "is_for_minor": "No"
    },
    "gender": {
      "sex": "Male"
    },
    "physical_measurements": {
      "height_inches": 70,
      "weight_lbs": 175
    },
    "medical_problem": {
      "main_medical_problem": "Hypertension"
    },
    "certificate_renewal": {
      "is_renewal": "No"
    },
    "medication": {
      "uses_medication": "Yes",
      "medication_details": "Lisinopril 10mg daily for blood pressure",
      "takes_prescription": "Yes",
      "prescription_details": "Lisinopril 10mg daily, Atorvastatin 20mg daily",
      "has_allergies": "No"
    },
    "surgery": {
      "had_surgery": "Yes",
      "surgery_details": "Appendectomy in 2005"
    },
    "lifestyle": {
      "exercises": "Yes",
      "exercise_frequency": "3-4 times per week",
      "smokes_tobacco": "No",
      "drinks_alcohol": "Yes",
      "alcohol_frequency": "1-2 drinks per week"
    },
    "medical_history": {
      "family_health_problems": "Yes",
      "family_health_details": "Father had heart disease, mother has type 2 diabetes",
      "diagnosed_conditions": ["Hypertension", "None of the above"]
    },
    "primary_care": {
      "has_provider": "Yes",
      "provider_details": "Dr. Sarah Johnson, Massachusetts General Hospital, 617-555-7890"
    },
    "provider_history": {
      "last_visit_date": "2023-11-15"
    },
    "diagnosis": {
      "condition_details": "Diagnosed with hypertension in 2020. Blood pressure well controlled with medication. Regular check-ups every 6 months."
    },
    "documents": {
      "drivers_license": {
        "filename": "john_doe_license.jpg",
        "url": "https://example.com/uploads/john_doe_license.jpg",
        "size": 2.5,
        "type": "image/jpeg"
      }
    }
  }
}; 