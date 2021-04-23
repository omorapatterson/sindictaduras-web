import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarPresidenteDialogModule } from './modules/mostrar-presidente-dialog/mostrar-presidente-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //
    MostrarPresidenteDialogModule
  ],
  declarations: []
})
export class DictadurasWebModule { }
