import {Component, OnInit} from '@angular/core';
import {FormControlBase, FormElementType} from '../../shared/form-helpers/form-control-base';
import {TextboxControl} from '../../shared/form-helpers/textbox-control';
import {FormGroup, Validators} from '@angular/forms';
import {toFormGroup} from '../../shared/form-helpers/to-form-group';
import {RegisterService} from './register.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {AuthFormValidators} from '../auth-form/auth-form-validators';

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
        AuthFormValidators.upperCase(1),
        AuthFormValidators.lowerCase(1),
        AuthFormValidators.numbers(1),
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
