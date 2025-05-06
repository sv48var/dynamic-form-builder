import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField, FieldType } from './field.model';
import { FormStateService } from '../services/form-state.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-form-config',
  templateUrl: './form-config.component.html',
  styleUrls: ['./form-config.component.scss']
})

export class FormConfigComponent implements OnInit{
  fieldForm: FormGroup;
  fieldsList = new MatTableDataSource<FormField>();
  fieldTypes: FieldType[] = ['text', 'number', 'email', 'dropdown'];
  isEditing = false;
  editIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formStateService: FormStateService
  ) {
    this.fieldForm = this.fb.group({
      label: ['', Validators.required],
      type: ['', Validators.required],
      required: [false],
      options: this.fb.array([]),
    });

    this.fieldForm.get('type')?.valueChanges.subscribe(value => {
      const options = this.fieldForm.get('options') as FormArray;
      if (value === 'dropdown' && options.length === 0) {
        options.push(this.fb.control('', Validators.required));
      } else if (value !== 'dropdown') {
        while (options.length) options.removeAt(0);
      }
    });
  }

  ngOnInit(): void {
    this.fieldsList.data = this.getFormFields();
  }

  getFormFields(): FormField[] {
    const data = this.formStateService.getFormFields();
    return data.map((field: any) => ({
      ...field,
      required: field.required ?? false 
    }));
  }
  
  get options(): FormArray {
    return this.fieldForm.get('options') as FormArray;
  }

  addDropdownOption(): void {
    this.options.push(this.fb.control('', Validators.required));
  }

  removeDropdownOption(index: number): void {
    this.options.removeAt(index);
  }

  isDropdown(): boolean {
    return this.fieldForm.get('type')?.value === 'dropdown';
  }

  addField(): void {
    if (this.fieldForm.invalid) return;
  
    const field = { ...this.fieldForm.value };
    if (field.type !== 'dropdown') {
      delete field.options;
    }
  
    const updatedList = this.fieldsList.data.slice(); 
    updatedList.push(field);
    this.fieldsList.data = updatedList;
  
    this.fieldForm.reset();
    this.clearOptions();
  }
  
  editField(index: number) {
    const field = this.fieldsList.data[index];
  
    this.fieldForm.patchValue({
      label: field.label,
      type: field.type,
      required: field.required
    });
  
    this.clearOptions();
  
    if (field.type === 'dropdown' && field.options) {
      const optionsArray = this.fieldForm.get('options') as FormArray;
      field.options.forEach(opt => optionsArray.push(this.fb.control(opt, Validators.required)));
    }
    this.isEditing = true;
    this.editIndex = index;
  }

  updateField() {
    if (this.editIndex === null) return;
  
    const updatedField = { ...this.fieldForm.value };
    if (updatedField.type !== 'dropdown') {
      delete updatedField.options;
    }
  
    const updatedList = this.fieldsList.data.slice(); 
    updatedList[this.editIndex] = updatedField;       
    this.fieldsList.data = updatedList;              
  
    this.fieldForm.reset();
    this.clearOptions();
  
    this.isEditing = false;
    this.editIndex = null;
  }
  
  removeField(index: number): void {
    const updatedList = this.fieldsList.data.slice();
    updatedList.splice(index, 1);
    this.fieldsList.data = updatedList;
  }
  

  clearOptions(): void {
    const options = this.fieldForm.get('options') as FormArray;
    while (options.length) options.removeAt(0);
  }

  generateForm(): void {
    this.formStateService.setFormFields(this.fieldsList.data);
    this.router.navigate(['/generated-form']);
  }
}