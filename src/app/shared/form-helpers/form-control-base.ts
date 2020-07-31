import {ValidatorFn} from '@angular/forms';

export enum FormElementType {TEXT = 'text', NUMBER = 'number', PASSWORD = 'password', EMAIL = 'email'}

export enum FormControlType {DROPDOWN = 'dropdown', TEXTBOX = 'textbox' }

interface ErrorMessages {
  [key: string]: string;
}

export interface FormControlOptions<T> {
  value: T;
  key: string;
  label?: string;
  validators?: ValidatorFn[];
  type: FormElementType;
  errorMessages?: ErrorMessages;
}

export abstract class FormControlBase<T> {
  value: T;
  key: string;
  label: string;
  validators: ValidatorFn[];
  type: FormElementType;
  errorMessages: ErrorMessages;
  abstract controlType: FormControlType;

  constructor({
                value,
                key,
                label = '',
                validators = [],
                type,
                errorMessages = {}
              }: FormControlOptions<T>) {
    this.value = value;
    this.key = key;
    this.label = label;
    this.validators = validators;
    this.type = type;
    this.errorMessages = errorMessages;
  }
}
