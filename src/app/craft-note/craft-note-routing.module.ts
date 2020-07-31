import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CraftNoteComponent} from './craft-note.component';

const routes: Routes = [{path: '', component: CraftNoteComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CraftNoteRoutingModule {
}
