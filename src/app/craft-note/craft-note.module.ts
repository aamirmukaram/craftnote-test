import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CraftNoteRoutingModule} from './craft-note-routing.module';
import {CraftNoteComponent} from './craft-note.component';
import {BarchartModule} from '../shared/barchart/barchart.module';
import {FeatureFormModule} from './feature-form/feature-form.module';


@NgModule({
  declarations: [CraftNoteComponent],
  imports: [
    CommonModule,
    CraftNoteRoutingModule,
    BarchartModule,
    FeatureFormModule,
  ]
})
export class CraftNoteModule {
}
