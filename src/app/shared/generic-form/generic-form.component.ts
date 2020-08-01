import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlBase} from './form-helpers/form-control-base';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent {
  @ViewChild('formRef') formRef: ElementRef;

  @Input()
  formControls: FormControlBase<any>[] = [];

  @Input()
  form: FormGroup = new FormGroup({});

  @Output()
  submitForm = new EventEmitter<FormGroup>();

  onFormSubmit(form: FormGroup): void {
    this.submitForm.next(form);
    (this.formRef.nativeElement as HTMLFormElement).reset();
    form.reset();
  }

  getErrorMessage(key: string, errorMessages: { [key: string]: string }): string | null {
    const control = this.form.get(key);
    const controlErrors = control?.errors;

    return controlErrors ?
      Object.keys(controlErrors).map((errorKey) => errorMessages[errorKey])[0] :
      null;
  }

}
