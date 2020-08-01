import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureFormComponent} from './feature-form.component';
import {GenericFormModule} from '../../shared/generic-form/generic-form.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [FeatureFormComponent],
  imports: [
    CommonModule,
    GenericFormModule,
    MatButtonModule
  ],
  exports: [FeatureFormComponent]
})
export class FeatureFormModule {
}
