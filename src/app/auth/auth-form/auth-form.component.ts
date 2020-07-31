import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlBase} from '../../shared/form-helpers/form-control-base';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Input() formControls: FormControlBase<any>[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Output() submitForm = new EventEmitter<FormGroup>();

  onFormSubmit(form: FormGroup): void {
    this.submitForm.next(form);
  }

  getErrorMessage(key: string, errorMessages: { [key: string]: string }): string | null {
    const control = this.form.get(key);
    const controlErrors = control?.errors;

    return controlErrors ?
      Object.keys(controlErrors).map((errorKey) => errorMessages[errorKey])[0] :
      null;
  }

}
