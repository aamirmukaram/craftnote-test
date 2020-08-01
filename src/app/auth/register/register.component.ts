import {Component, OnInit} from '@angular/core';
import {FormControlBase, FormElementType} from '../../shared/generic-form/form-helpers/form-control-base';
import {TextboxControl} from '../../shared/generic-form/form-helpers/textbox-control';
import {FormGroup, Validators} from '@angular/forms';
import {toFormGroup} from '../../shared/generic-form/form-helpers/to-form-group';
import {RegisterService} from './register.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {CustomValidators} from '../../shared/generic-form/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormControlBase<string>[] = [
    new TextboxControl({
      type: FormElementType.EMAIL,
      key: 'email',
      value: '',
      label: 'Enter your email',
      validators: [Validators.required, Validators.email],
      errorMessages: {
        required: 'Email is required',
        email: 'Email is not valid',
      }
    }),
    new TextboxControl({
      type: FormElementType.PASSWORD,
      key: 'password',
      value: '',
      label: 'Enter your password',
      validators: [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.upperCase(1),
        CustomValidators.lowerCase(1),
        CustomValidators.numbers(1),
      ],
      errorMessages: {
        required: 'Password is required',
        minlength: 'Minimum 8 characters are required',
        uppercase: 'At least 1 uppercase character is required',
        lowercase: 'At least 1 lowercase character is required',
        numbers: 'At least 1 number is required',
      }
    })
  ];
  registerFormGroup: FormGroup = toFormGroup<string>(this.registerForm);

  constructor(private registerService: RegisterService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  submitForm(registerForm: FormGroup): void {
    const {email, password} = registerForm.value;
    this.registerService.createUser(email, password).subscribe(noop, (errorMessage: string) => {
      this.snackBar.open(errorMessage);
    }, () => {
      this.snackBar.open('User created');
      this.router.navigate(['/']);
    });
  }
}
