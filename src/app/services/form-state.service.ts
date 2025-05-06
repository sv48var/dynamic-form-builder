import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FormField {
  label: string;
  type: string;
  options?: string[];
  validations?: string[];
}

@Injectable({
  providedIn: 'root'
})

export class FormStateService {

  private formFieldsSubject = new BehaviorSubject<FormField[]>([]);
  formField$ = this.formFieldsSubject.asObservable();

  constructor() { }

  setFormFields(fields: FormField[]){
    this.formFieldsSubject.next(fields);
  }

  getFormFields(){
    return this.formFieldsSubject.getValue();
  }
}