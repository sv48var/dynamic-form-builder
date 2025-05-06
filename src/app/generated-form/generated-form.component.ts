import { Component, OnInit, Inject } from '@angular/core';
import { FormStateService } from '../services/form-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../form-config/field.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generated-form',
  templateUrl: './generated-form.component.html',
  styleUrl: './generated-form.component.scss'
})
export class GeneratedFormComponent implements OnInit {

  generatedForm:FormGroup = new FormGroup({});
  formFields:FormField[] = [];

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){
    this.generatedForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.formFields = this.getFormFields();
    this.initializeForm();
    console.log(this.formFields);
  }

  getFormFields(): FormField[] {
    const data = this.formStateService.getFormFields();
    return data.map((field: any) => ({
      ...field,
      required: field.required ?? false 
    }));
  }

  initializeForm(){
    this.formFields.forEach(field => {
      const validators = [];
    
      if (field.required) {
        validators.push(Validators.required);
      }
    
      const control = this.fb.control('', validators);
      this.generatedForm.addControl(field.id, control);
    });    
  }

  onSubmit(){
    if(this.generatedForm.invalid) return;
    if (this.generatedForm.valid) {
      const formData = this.generatedForm.value;
      this.dialog.open(GeneratedFormModal, {
        data: formData,
        width: '600px'
      });
    }
  }
}

@Component({
  selector: 'generated-form-modal',
  templateUrl: './generated-form-modal.html',
  styleUrl: './generated-form.component.scss'
})

export class GeneratedFormModal{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formStateService: FormStateService
  ) {}

  createNew(){
    this.formStateService.removeFormFields();
    this.router.navigate(['/form-config']);
  }
}