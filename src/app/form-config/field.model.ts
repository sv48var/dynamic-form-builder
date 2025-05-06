export type FieldType = 'text' | 'number' | 'email' | 'dropdown';

export interface FormField {
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}