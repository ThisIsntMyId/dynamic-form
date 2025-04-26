// ===== FIELD TYPES =====
export type FieldType = 
  | "text" 
  | "textarea" 
  | "number" 
  | "email" 
  | "phone" 
  | "radio" 
  | "checkbox" 
  | "date" 
  | "document" 
  | "combobox"

// ===== OPTION TYPE =====
export type Option = {
  value: string
  label: string
}

// ===== QUESTION TYPE =====
export type Question = {
  id: string | number
  code: string                   // Stable identifier for the question
  type: FieldType               // Input field type
  text: string                   // Question text
  order: number                  // Sequence within page
  hint?: string                  // Helper text
  placeholder?: string           // Field placeholder
  required: boolean              // If field is mandatory
  pattern?: string               // Regex validation pattern
  max?: number | string          // Maximum value/length
  min?: number | string          // Minimum value/length
  prefix?: string                // Text before input
  suffix?: string                // Text after input
  options?: string[] | Option[]  // For selection inputs
  colspan?: number               // Grid columns to span
  
  // Custom error messages
  requiredError?: string         // Error when field is empty
  maxError?: string              // Error when exceeding maximum
  minError?: string              // Error when below minimum
  patternError?: string          // Error when pattern validation fails
  
  followup_questions?: Omit<Question, "followup_questions">[]  // Conditional follow-up questions
  showFollowupWhen?: string | string[]  // Values that trigger showing follow-ups
  
  filetype?: string[]            // Allowed file types for document fields
  maxFileSize?: number           // Maximum file size in MB
}

// ===== PAGE TYPE =====
export type Page = {
  id: string | number
  code: string                   // Stable identifier for the page
  title: string                  // Display title
  desc?: string                  // Page description
  order: number                  // Sequence number
  columns: number                // Grid layout columns
  questions: Question[]          // Questions on this page
  footer?: string                // Page-level footnotes or notes
}

// ===== FORM CONFIG TYPE =====
export type IntakeFormConfig = {
  title: string
  description?: string
  slug: string
  formNotes?: string
  type: string                    // Form type identifier
  tag: string                     // Form tag identifier
  pages: Page[]
}

// ===== FORM RESPONSE TYPE =====
export type IntakeFormResponse = {
  patientId: string
  formId: string
  submissionDate: string
  type: string                    // Form type identifier
  tag: string                     // Form tag identifier
  formComplete: boolean
  responses: Record<string, Record<string, any>>  // Flexible response structure
} 