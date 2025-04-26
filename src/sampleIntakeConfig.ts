import type { IntakeFormConfig } from './types';

export const sampleIntakeConfig: IntakeFormConfig = {
  title: "Sample Patient Intake Form",
  description: "A simplified version of the patient intake form for development purposes",
  slug: "sample-intake",
  formNotes: "This is a development version with minimal fields",
  type: "med_card",
  tag: "new",
  pages: [
    {
      id: "page1",
      code: "personal_info",
      title: "Personal Information",
      desc: "Basic patient information",
      order: 1,
      columns: 2,
      questions: [
        {
          id: "q1",
          code: "first_name",
          type: "text",
          text: "First Name",
          order: 1,
          required: true,
          requiredError: "First name is required",
          placeholder: "Enter your first name",
          hint: "Your legal first name",
          colspan: 1
        },
        {
          id: "q2",
          code: "last_name",
          type: "text",
          text: "Last Name",
          order: 2,
          required: true,
          requiredError: "Last name is required",
          placeholder: "Enter your last name",
          hint: "Your legal last name",
          colspan: 1
        },
        {
          id: "q3",
          code: "date_of_birth",
          type: "date",
          text: "Date of Birth",
          order: 3,
          required: true,
          requiredError: "Date of birth is required",
          hint: "Your date of birth (MM/DD/YYYY)",
          min: "1900-01-01",
          max: "today",
          minError: "Date must be after 1900",
          maxError: "Date cannot be in the future",
          colspan: 2
        }
      ],
      footer: "This is a page-level note or footnote."
    },
    {
      id: "page2",
      code: "contact_info",
      title: "Contact Information",
      desc: "How to reach the patient",
      order: 2,
      columns: 1,
      questions: [
        {
          id: "q4",
          code: "phone",
          type: "phone",
          text: "Phone Number",
          order: 1,
          required: true,
          requiredError: "Phone number is required",
          placeholder: "(___) ___-____",
          hint: "Your primary contact number",
          pattern: "^\\d{10}$",
          patternError: "Please enter a valid 10-digit phone number",
          colspan: 1
        },
        {
          id: "q5",
          code: "email",
          type: "email",
          text: "Email Address",
          order: 2,
          required: false,
          placeholder: "your.email@example.com",
          hint: "Your primary email address",
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          patternError: "Please enter a valid email address",
          colspan: 1
        }
      ]
    },
    {
      id: "page3",
      code: "medical_info",
      title: "Medical Information",
      desc: "Basic health information",
      order: 3,
      columns: 1,
      questions: [
        {
          id: "q6",
          code: "has_conditions",
          type: "radio",
          text: "Do you have any medical conditions?",
          order: 1,
          required: true,
          requiredError: "Please indicate if you have medical conditions",
          options: ["Yes", "No"],
          colspan: 1,
          showFollowupWhen: "Yes",
          followup_questions: [
            {
              id: "q6a",
              code: "condition_details",
              type: "textarea",
              text: "Please describe your medical conditions",
              order: 1,
              required: true,
              requiredError: "Please describe your medical conditions",
              placeholder: "Describe your medical conditions",
              colspan: 1
            }
          ]
        },
        {
          id: "q7",
          code: "height",
          type: "number",
          text: "Height",
          order: 2,
          required: true,
          requiredError: "Height is required",
          placeholder: "Enter height",
          hint: "Your height in inches",
          min: 24,
          max: 96,
          minError: "Height must be at least 24 inches",
          maxError: "Height cannot exceed 96 inches",
          suffix: "inches",
          colspan: 1
        }
      ]
    }
  ]
}; 