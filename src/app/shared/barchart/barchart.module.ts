import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarchartComponent} from './barchart.component';


@NgModule({
  declarations: [BarchartComponent],
  imports: [
    CommonModule
  ],
  exports: [BarchartComponent]
})
export class BarchartModule {
}
