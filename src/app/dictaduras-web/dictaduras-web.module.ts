import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarPresidenteDialogModule } from './modules/mostrar-presidente-dialog/mostrar-presidente-dialog.module';
import {UiModule} from '../../ui/ui.module';
import {AuthenticationModule} from '../../common/authentication/authentication.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    //
    MostrarPresidenteDialogModule,
    AuthenticationModule
  ],
  declarations: []
})
export class DictadurasWebModule { }
