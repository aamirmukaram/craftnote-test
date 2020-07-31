import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CraftNoteRoutingModule } from './craft-note-routing.module';
import { CraftNoteComponent } from './craft-note.component';


@NgModule({
  declarations: [CraftNoteComponent],
  imports: [
    CommonModule,
    CraftNoteRoutingModule
  ]
})
export class CraftNoteModule { }
