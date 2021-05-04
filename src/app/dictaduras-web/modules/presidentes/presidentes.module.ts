import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresidentesCardComponent } from './components/presidentes-card/presidentes-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PresidentesCardComponent
  ],
  declarations: [
    PresidentesCardComponent
  ]
})
export class PresidentesModule { }
