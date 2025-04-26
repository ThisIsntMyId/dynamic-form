import type { IntakeFormConfig } from './types';

export const intakeFormConfig: IntakeFormConfig = {
  "title": "Patient Intake Form",
  "description": "Please complete this form to help us understand your medical history and current health status",
  "slug": "patient-intake",
  "formNotes": "Fields marked with an asterisk (*) are required fields",
  "type": "med_card",
  "tag": "new",
  "pages": [
    {
      "id": 1,
      "code": "bio",
      "title": "Bio",
      "desc": "Please provide your basic personal information.",
      "order": 1,
      "columns": 2,
      "questions": [
        {
          "id": 1,
          "code": "first_name",
          "type": "text",
          "text": "First Name",
          "order": 1,
          "required": true,
          "requiredError": "First name is required",
          "placeholder": "Enter your first name",
          "hint": "Your legal first name as it appears on your ID",
          "colspan": 1
        },
        {
          "id": 2,
          "code": "middle_name",
          "type": "text",
          "text": "Middle Name",
          "order": 2,
          "required": false,
          "placeholder": "Enter your middle name (if applicable)",
          "colspan": 1
        },
        {
          "id": 3,
          "code": "last_name",
          "type": "text",
          "text": "Last Name",
          "order": 3,
          "required": true,
          "requiredError": "Last name is required",
          "placeholder": "Enter your last name",
          "hint": "Your legal last name as it appears on your ID",
          "colspan": 2
        }
      ],
      "footer": "This is a page-level note or footnote."
    },
    {
      "id": 2,
      "code": "dob",
      "title": "DOB",
      "desc": "Please provide your date of birth.",
      "order": 2,
      "columns": 1,
      "questions": [
        {
          "id": 4,
          "code": "date_of_birth",
          "type": "date",
          "text": "Date of Birth",
          "order": 1,
          "required": true,
          "requiredError": "Date of birth is required",
          "hint": "Your full date of birth (MM/DD/YYYY)",
          "min": "1900-01-01",
          "max": "today",
          "minError": "Date must be after 1900",
          "maxError": "Date cannot be in the future"
        }
      ]
    },
    {
      "id": 3,
      "code": "address_details",
      "title": "Details",
      "desc": "Please provide your current address information.",
      "order": 3,
      "columns": 2,
      "questions": [
        {
          "id": 5,
          "code": "address_street",
          "type": "text",
          "text": "Address",
          "order": 1,
          "required": true,
          "requiredError": "Street address is required",
          "placeholder": "Street address",
          "hint": "Your current residential street address",
          "colspan": 2
        },
        {
          "id": 6,
          "code": "address_apt",
          "type": "text",
          "text": "Apartment",
          "order": 2,
          "required": false,
          "placeholder": "Apt, Suite, Unit, etc. (optional)",
          "colspan": 2
        },
        {
          "id": 7,
          "code": "address_city",
          "type": "text",
          "text": "City",
          "order": 3,
          "required": true,
          "requiredError": "City is required",
          "placeholder": "City name",
          "colspan": 1
        },
        {
          "id": 8,
          "code": "address_state",
          "type": "text",
          "text": "State",
          "order": 4,
          "required": true,
          "requiredError": "State is required",
          "placeholder": "State",
          "colspan": 1
        },
        {
          "id": 9,
          "code": "address_zip",
          "type": "text",
          "text": "Zip Code",
          "order": 5,
          "required": true,
          "requiredError": "Zip code is required",
          "placeholder": "Zip code",
          "hint": "5-digit zip code",
          "pattern": "^\\d{5}$",
          "patternError": "Please enter a valid 5-digit zip code",
          "colspan": 1
        }
      ]
    },
    {
      "id": 4,
      "code": "contact_info",
      "title": "Contact",
      "desc": "Please provide your contact information.",
      "order": 4,
      "columns": 1,
      "questions": [
        {
          "id": 10,
          "code": "phone_primary",
          "type": "phone",
          "text": "Phone Number",
          "order": 1,
          "required": true,
          "requiredError": "Primary phone number is required",
          "placeholder": "(___) ___-____",
          "hint": "Primary phone number where we can reach you",
          "pattern": "^\\d{10}$",
          "patternError": "Please enter a valid 10-digit phone number",
          "colspan": 1
        },
        {
          "id": 11,
          "code": "phone_alternative",
          "type": "phone",
          "text": "Alternative Phone number",
          "order": 2,
          "required": false,
          "placeholder": "(___) ___-____",
          "hint": "Secondary phone number (optional)",
          "pattern": "^\\d{10}$",
          "patternError": "Please enter a valid 10-digit phone number",
          "colspan": 1
        }
      ]
    },
    {
      "id": 5,
      "code": "minor_info",
      "title": "Minor",
      "desc": "Please indicate if you are filling this form on behalf of a minor.",
      "order": 5,
      "columns": 2,
      "questions": [
        {
          "id": 12,
          "code": "is_for_minor",
          "type": "radio",
          "text": "Are you filling this out for a minor",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate if this is for a minor",
          "options": ["Yes", "No"],
          "colspan": 2,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "12-1",
              "code": "minor_first_name",
              "type": "text",
              "text": "First name of minor",
              "order": 1,
              "required": true,
              "requiredError": "Minor's first name is required",
              "placeholder": "Minor's first name",
              "colspan": 1
            },
            {
              "id": "12-2",
              "code": "minor_last_name",
              "type": "text",
              "text": "Last name of minor",
              "order": 2,
              "required": true,
              "requiredError": "Minor's last name is required",
              "placeholder": "Minor's last name",
              "colspan": 1
            },
            {
              "id": "12-3",
              "code": "minor_dob",
              "type": "date",
              "text": "Date of birth of minor",
              "order": 3,
              "required": true,
              "requiredError": "Minor's date of birth is required",
              "min": "1900-01-01",
              "max": "today",
              "minError": "Date must be after 1900",
              "maxError": "Date cannot be in the future",
              "colspan": 1
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "code": "gender",
      "title": "Gender",
      "desc": "Please indicate your biological sex.",
      "order": 6,
      "columns": 1,
      "questions": [
        {
          "id": 13,
          "code": "sex",
          "type": "radio",
          "text": "Sex",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate your sex",
          "options": ["Male", "Female", "Other"],
          "colspan": 1
        }
      ]
    },
    {
      "id": 7,
      "code": "physical_measurements",
      "title": "Measurements",
      "desc": "Please provide your current height and weight information.",
      "order": 7,
      "columns": 2,
      "questions": [
        {
          "id": 14,
          "code": "height_inches",
          "type": "number",
          "text": "Height",
          "order": 1,
          "required": false,
          "placeholder": "Enter height",
          "suffix": "in",
          "hint": "Your height in inches",
          "min": 24,
          "max": 96,
          "minError": "Height must be at least 24 inches",
          "maxError": "Height cannot exceed 96 inches",
          "colspan": 1
        },
        {
          "id": 15,
          "code": "weight_lbs",
          "type": "number",
          "text": "Weight",
          "order": 2,
          "required": false,
          "placeholder": "Enter weight",
          "suffix": "lbs",
          "hint": "Your weight in pounds",
          "min": 50,
          "max": 500,
          "minError": "Weight must be at least 50 lbs",
          "maxError": "Weight cannot exceed 500 lbs",
          "colspan": 1
        }
      ]
    },
    {
      "id": 8,
      "code": "medical_problem",
      "title": "Medical Problem",
      "desc": "Please provide information about your medical conditions.",
      "order": 8,
      "columns": 1,
      "questions": [
        {
          "id": 16,
          "code": "main_medical_problem",
          "type": "radio",
          "text": "What is/are the main medical problem(s) which you currently have or have had in the past?",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate your main medical problem",
          "options": ["Diabetes", "Hypertension", "Heart Disease", "Asthma", "Other"],
          "colspan": 1,
          "showFollowupWhen": "Other",
          "followup_questions": [
            {
              "id": "16-1",
              "code": "medical_problem_other",
              "type": "textarea",
              "text": "If other, specify",
              "order": 1,
              "required": true,
              "requiredError": "Please describe your medical condition",
              "placeholder": "Please describe your medical condition",
              "colspan": 1
            }
          ]
        }
      ]
    },
    {
      "id": 9,
      "code": "certificate_renewal",
      "title": "Certificate Renewal",
      "desc": "Please provide information about any previous certifications.",
      "order": 9,
      "columns": 1,
      "questions": [
        {
          "id": 17,
          "code": "is_renewal",
          "type": "radio",
          "text": "Are you RENEWING your certification (Have you had a certification in the last 10 years)?",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate if this is a renewal",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "17-1",
              "code": "renewal_details",
              "type": "textarea",
              "text": "If yes, specify",
              "order": 1,
              "required": true,
              "requiredError": "Please provide details about your previous certification",
              "placeholder": "Provide details about your previous certification",
              "colspan": 1
            }
          ]
        }
      ]
    },
    {
      "id": 10,
      "code": "medication",
      "title": "Medication",
      "desc": "Please provide information about your current medications.",
      "order": 10,
      "columns": 1,
      "questions": [
        {
          "id": 18,
          "code": "uses_medication",
          "type": "radio",
          "text": "Do you currently use specific medications for your medical condition?",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate if you use medications",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "18-1",
              "code": "medication_details",
              "type": "textarea",
              "text": "If yes, specify",
              "order": 1,
              "required": true,
              "requiredError": "Please list your medications",
              "placeholder": "List all medications you currently take",
              "colspan": 1
            }
          ]
        },
        {
          "id": 19,
          "code": "takes_prescription",
          "type": "radio",
          "text": "Are you taking any prescription medications or herbs?",
          "order": 2,
          "required": true,
          "requiredError": "Please indicate if you take prescription medications",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "19-1",
              "code": "prescription_details",
              "type": "textarea",
              "text": "If yes, specify",
              "order": 1,
              "required": true,
              "requiredError": "Please list your prescription medications",
              "placeholder": "List all prescription medications or herbs",
              "colspan": 1
            }
          ]
        },
        {
          "id": 20,
          "code": "has_allergies",
          "type": "radio",
          "text": "Do you have any allergies to any medications?",
          "order": 3,
          "required": true,
          "requiredError": "Please indicate if you have medication allergies",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "20-1",
              "code": "allergy_details",
              "type": "textarea",
              "text": "If yes, specify",
              "order": 1,
              "required": true,
              "requiredError": "Please list your medication allergies",
              "placeholder": "List all medication allergies",
              "colspan": 1
            }
          ]
        }
      ]
    },
    {
      "id": 11,
      "code": "surgery",
      "title": "Surgery",
      "desc": "Please provide information about any past surgeries or hospitalizations.",
      "order": 11,
      "columns": 1,
      "questions": [
        {
          "id": 21,
          "code": "had_surgery",
          "type": "radio",
          "text": "Have you ever had any surgeries or been hospitalized?",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate if you've had surgeries",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "21-1",
              "code": "surgery_details",
              "type": "textarea",
              "text": "If yes, specify",
              "order": 1,
              "required": true,
              "requiredError": "Please provide details about your surgeries",
              "placeholder": "Provide details about surgeries or hospitalizations",
              "colspan": 1
            }
          ]
        }
      ]
    },
    {
      "id": 12,
      "code": "lifestyle",
      "title": "Lifestyle",
      "desc": "Please provide information about your lifestyle habits.",
      "order": 12,
      "columns": 1,
      "questions": [
        {
          "id": 22,
          "code": "exercises",
          "type": "radio",
          "text": "Do you exercise?",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate if you exercise",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "22-1",
              "code": "exercise_frequency",
              "type": "text",
              "text": "If yes, how often?",
              "order": 1,
              "required": true,
              "requiredError": "Please specify your exercise frequency",
              "placeholder": "e.g., 3 times per week",
              "colspan": 1
            }
          ]
        },
        {
          "id": 23,
          "code": "smokes_tobacco",
          "type": "radio",
          "text": "Do you smoke tobacco?",
          "order": 2,
          "required": true,
          "requiredError": "Please indicate if you smoke tobacco",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "23-1",
              "code": "smoking_frequency",
              "type": "text",
              "text": "If yes, how often?",
              "order": 1,
              "required": true,
              "requiredError": "Please specify your smoking frequency",
              "placeholder": "e.g., 1 pack per day",
              "colspan": 1
            }
          ]
        },
        {
          "id": 24,
          "code": "drinks_alcohol",
          "type": "radio",
          "text": "Do you drink alcohol?",
          "order": 3,
          "required": true,
          "requiredError": "Please indicate if you drink alcohol",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "24-1",
              "code": "alcohol_frequency",
              "type": "text",
              "text": "If yes, how often?",
              "order": 1,
              "required": true,
              "requiredError": "Please specify your alcohol consumption frequency",
              "placeholder": "e.g., 2-3 times per week",
              "colspan": 1
            }
          ]
        }
      ]
    },
    {
      "id": 13,
      "code": "medical_history",
      "title": "Medical History",
      "desc": "Please provide information about your family medical history.",
      "order": 13,
      "columns": 1,
      "questions": [
        {
          "id": 25,
          "code": "family_health_problems",
          "type": "radio",
          "text": "Are there health/medical problems that occur frequently in your family?",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate if there are family health problems",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "25-1",
              "code": "family_health_details",
              "type": "textarea",
              "text": "If yes, specify",
              "order": 1,
              "required": true,
              "requiredError": "Please describe family medical history",
              "placeholder": "Describe family medical history",
              "colspan": 1
            }
          ]
        },
        {
          "id": 26,
          "code": "diagnosed_conditions",
          "type": "checkbox",
          "text": "Have you experienced or been diagnosed with any of the following?",
          "order": 2,
          "required": true,
          "requiredError": "Please select at least one option",
          "options": ["Hypertension", "Diabetes", "Cancer", "Heart Disease", "Stroke", "Asthma", "Allergies", "Mental Health Conditions", "None of the above"],
          "colspan": 1
        }
      ]
    },
    {
      "id": 14,
      "code": "primary_care",
      "title": "Primary Care Provider",
      "desc": "Please provide information about your primary care provider.",
      "order": 14,
      "columns": 1,
      "questions": [
        {
          "id": 27,
          "code": "has_provider",
          "type": "radio",
          "text": "Do you have a primary care provider?",
          "order": 1,
          "required": true,
          "requiredError": "Please indicate if you have a primary care provider",
          "options": ["Yes", "No"],
          "colspan": 1,
          "showFollowupWhen": "Yes",
          "followup_questions": [
            {
              "id": "27-1",
              "code": "provider_details",
              "type": "textarea",
              "text": "If yes, specify name, address & phone",
              "order": 1,
              "required": true,
              "requiredError": "Please provide provider details",
              "placeholder": "Provider name, address, and phone number",
              "colspan": 1
            }
          ]
        }
      ]
    },
    {
      "id": 15,
      "code": "provider_history",
      "title": "History with Care Provider",
      "desc": "Please provide information about your last visit with a healthcare provider.",
      "order": 15,
      "columns": 1,
      "questions": [
        {
          "id": 28,
          "code": "last_visit_date",
          "type": "date",
          "text": "When was the last time you saw your doctor/specialist about these complaints?",
          "order": 1,
          "required": false,
          "min": "1900-01-01",
          "max": "today",
          "minError": "Date must be after 1900",
          "maxError": "Date cannot be in the future",
          "colspan": 1
        }
      ]
    },
    {
      "id": 16,
      "code": "diagnosis",
      "title": "Care Provider Diagnosis",
      "desc": "Please provide details about your medical condition and diagnosis.",
      "order": 16,
      "columns": 1,
      "questions": [
        {
          "id": 29,
          "code": "condition_details",
          "type": "textarea",
          "text": "Provide details on the medical condition and diagnosis:",
          "order": 1,
          "required": false,
          "placeholder": "Describe your condition and any diagnosis you've received",
          "colspan": 1
        }
      ]
    },
    {
      "id": 17,
      "code": "documents",
      "title": "Document",
      "desc": "Please upload a copy of your driver's license or identification.",
      "order": 17,
      "columns": 1,
      "questions": [
        {
          "id": 30,
          "code": "drivers_license",
          "type": "document",
          "text": "Please provide your drivers licence",
          "order": 1,
          "required": false,
          "filetype": ["jpg", "jpeg", "png", "pdf"],
          "maxFileSize": 5,
          "hint": "Upload a clear image of your driver's license (5MB max)",
          "colspan": 1
        }
      ]
    }
  ]
}; 