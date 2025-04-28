import { createFileRoute } from '@tanstack/react-router'
import { DynamicForm } from '../components/Form/DynamicForm'
import type { IntakeFormConfig } from '../types'
import { useState } from 'react'

const sampleFormConfig: IntakeFormConfig = {
  title: "Patient Intake Form",
  description: "Please fill out the following information",
  slug: "patient-intake",
  formNotes: "All fields marked with * are required",
  type: "patient",
  tag: "intake",
  pages: [
    {
      id: "1",
      code: "basicInfo",
      title: "Basic Information",
      desc: "Please provide your basic information",
      order: 1,
      columns: 2,
      questions: [
        {
          id: "1",
          code: "firstName",
          type: "text",
          text: "First Name",
          order: 1,
          required: true,
          requiredError: "Please enter your first name",
          colspan: 1
        },
        {
          id: "2",
          code: "lastName",
          type: "text",
          text: "Last Name",
          order: 2,
          required: true,
          requiredError: "Please enter your last name",
          colspan: 1
        },
        {
          id: "3",
          code: "email",
          type: "email",
          text: "Email Address",
          order: 3,
          required: true,
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          patternError: "Please enter a valid email address",
          colspan: 2
        },
        {
          id: "4",
          code: "phone",
          type: "phone",
          text: "Phone Number",
          order: 4,
          required: true,
          colspan: 2
        },
        {
          id: "5",
          code: "gender",
          type: "radio",
          text: "Gender",
          order: 5,
          required: true,
          options: ["Male", "Female", "Other", "Prefer not to say"],
          colspan: 2
        },
        {
          id: "6",
          code: "country",
          type: "combobox",
          text: "Country",
          order: 6,
          required: true,
          options: [
            "United States",
            "Canada",
            "United Kingdom",
            "Australia",
            "Germany",
            "France",
            "Japan",
            "China",
            "India",
            "Brazil"
          ],
          colspan: 2
        }
      ]
    },
    {
      id: "2",
      code: "medicalHistory",
      title: "Medical History",
      desc: "Please provide your medical history",
      order: 2,
      columns: 1,
      questions: [
        {
          id: "7",
          code: "allergies",
          type: "checkbox",
          text: "Do you have any of these allergies?",
          order: 1,
          required: false,
          options: [
            "Pollen",
            "Dust",
            "Pet Dander",
            "Peanuts",
            "Shellfish",
            "Dairy",
            "Eggs",
            "Soy",
            "Wheat",
            "Other"
          ],
          colspan: 1,
          showFollowupWhen: "Other",
          followup_questions: [
            {
              id: "8",
              code: "otherAllergies",
              type: "textarea",
              text: "Other Allergies",
              order: 2,
              required: false,
              placeholder: "Please specify any other allergies not listed above",
              colspan: 1
            },
          ]
        },
        {
          id: "9",
          code: "takingMedications",
          type: "radio",
          text: "Are you currently taking any medications?",
          order: 3,
          required: true,
          options: ["Yes", "No"],
          showFollowupWhen: "Yes",
          followup_questions: [
            {
              id: "9.1",
              code: "medicationList",
              type: "textarea",
              text: "Please list your current medications",
              order: 1,
              required: true,
              placeholder: "Enter each medication on a new line",
              colspan: 1
            },
            {
              id: "9.2",
              code: "medicationDuration",
              type: "text",
              text: "How long have you been taking these medications?",
              order: 2,
              required: true,
              placeholder: "e.g., 6 months, 2 years",
              colspan: 1
            }
          ],
          colspan: 1
        },
        {
          id: "10",
          code: "pets",
          type: "checkbox",
          text: "Do you have any pets? If yes, please select all that apply",
          order: 4,
          required: false,
          options: ["Dog", "Cat", "Rabbit", "Turtle", "Bird", "Other"],
          showFollowupWhen: "Other",
          followup_questions: [
            {
              id: "10.1",
              code: "otherPetType",
              type: "text",
              text: "What type of pet do you have?",
              order: 1,
              required: true,
              placeholder: "e.g., Hamster, Fish, Snake",
              colspan: 1
            },
            {
              id: "10.2",
              code: "petSpecies",
              type: "text",
              text: "If known, what is the species?",
              order: 2,
              required: false,
              placeholder: "e.g., Golden Retriever, Siamese, African Grey",
              colspan: 1
            }
          ],
          colspan: 1
        },
        {
          id: "11",
          code: "conditions",
          type: "textarea",
          text: "Medical Conditions",
          order: 5,
          required: false,
          placeholder: "List any medical conditions you have",
          colspan: 1
        }
      ]
    },
    {
      id: "3",
      code: "insurance",
      title: "Insurance Information",
      desc: "Please provide your insurance details",
      order: 3,
      columns: 2,
      questions: [
        {
          id: "11",
          code: "provider",
          type: "text",
          text: "Insurance Provider",
          order: 1,
          required: true,
          colspan: 2
        },
        {
          id: "12",
          code: "policyNumber",
          type: "text",
          text: "Policy Number",
          order: 2,
          required: true,
          colspan: 1
        },
        {
          id: "13",
          code: "groupNumber",
          type: "text",
          text: "Group Number",
          order: 3,
          required: false,
          colspan: 1
        },
        {
          id: "14",
          code: "documents",
          type: "document",
          text: "Insurance Card",
          order: 4,
          required: true,
          filetype: ["image/jpeg", "image/png", "application/pdf"],
          maxFileSize: 5,
          colspan: 2
        }
      ]
    }
  ]
}

export const Route = createFileRoute('/dynamic-form')({
  component: RouteComponent,
})

function RouteComponent() {
  const [userResponse, setUserResponse] = useState<Record<string, Record<string, any>>>({})
  const [currentStep, setCurrentStep] = useState(sampleFormConfig.pages[0].code)

  const handleStepChange = (step: string, data: Record<string, Record<string, any>>) => {
    setCurrentStep(step)
    setUserResponse(data)
  }

  const handleSubmit = (data: Record<string, Record<string, any>>) => {
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <p>Current Step: {currentStep}</p>
      <DynamicForm
        formConfig={sampleFormConfig}
        userResponse={userResponse}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
