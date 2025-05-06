export type FieldType = 'text' | 'number' | 'email' | 'dropdown';

export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}
