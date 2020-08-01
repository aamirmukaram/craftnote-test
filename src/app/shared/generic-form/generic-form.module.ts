import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericFormComponent} from './generic-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [GenericFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [GenericFormComponent]
})
export class GenericFormModule {
}
