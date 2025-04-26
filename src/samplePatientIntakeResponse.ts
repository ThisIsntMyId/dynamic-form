import type { IntakeFormResponse } from './types';

export const samplePatientIntakeResponse: IntakeFormResponse = {
  patientId: "P12345",
  formId: "SAMPLE-2024-01-01",
  submissionDate: "2024-01-15T10:30:00Z",
  type: "med_card",
  tag: "new",
  formComplete: true,
  responses: {
    "personal_info": {
      "first_name": "Jane",
      "last_name": "Smith",
      "date_of_birth": "1990-05-15"
    },
    "contact_info": {
      "phone": "6175551234",
      "email": "jane.smith@example.com"
    },
    "medical_info": {
      "has_conditions": "Yes",
      "condition_details": "Mild asthma, controlled with inhaler",
      "height": 65
    }
  }
}; 