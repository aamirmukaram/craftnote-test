import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {AuthFormModule} from '../auth-form/auth-form.module';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../auth.service';
import {RegisterService} from './register.service';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    AuthFormModule,
    MatButtonModule
  ],
  providers: [{provide: RegisterService, useExisting: AuthService}]
})
export class RegisterModule {
}
