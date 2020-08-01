import { Component, OnInit } from '@angular/core';
import {TextboxControl} from '../../shared/generic-form/form-helpers/textbox-control';
import {FormControlBase, FormElementType} from '../../shared/generic-form/form-helpers/form-control-base';
import {FormGroup, Validators} from '@angular/forms';
import {toFormGroup} from '../../shared/generic-form/form-helpers/to-form-group';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormControlBase<string>[] = [
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
      validators: [Validators.required],
      errorMessages: {
        required: 'Password is required',
      }
    })
  ];
  loginFormGroup: FormGroup = toFormGroup<string>(this.loginForm);

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  submitForm(loginForm: FormGroup): void {
    const {email, password} = loginForm.value;
    this.loginService.login(email, password).subscribe(noop, (errorMessage: string) => {
      this.snackBar.open(errorMessage);
    }, () => {
      this.snackBar.open('Login successful');
      this.router.navigate(['/']);
    });
  }
}
