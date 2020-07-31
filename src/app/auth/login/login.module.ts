import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {LoginService} from './login.service';
import {AuthService} from '../auth.service';
import {AuthFormModule} from '../auth-form/auth-form.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AuthFormModule,
    MatButtonModule
  ],
  providers: [{provide: LoginService, useExisting: AuthService}]
})
export class LoginModule {
}
