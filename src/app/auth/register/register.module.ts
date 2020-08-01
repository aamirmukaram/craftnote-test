import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../auth.service';
import {RegisterService} from './register.service';
import {GenericFormModule} from '../../shared/generic-form/generic-form.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    GenericFormModule,
    MatButtonModule
  ],
  providers: [{provide: RegisterService, useExisting: AuthService}]
})
export class RegisterModule {
}
