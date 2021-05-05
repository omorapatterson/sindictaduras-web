import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarPresidenteDialogModule } from './modules/mostrar-presidente-dialog/mostrar-presidente-dialog.module';
import { UiModule } from '../../ui/ui.module';
import { AuthenticationModule } from '../../common/authentication/authentication.module';
import { PresidentesModule } from './modules/presidentes/presidentes.module';
import { VotacionModule } from './modules/votacion/votacion.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    //
    MostrarPresidenteDialogModule,
    PresidentesModule,
    VotacionModule,
    AuthenticationModule,
    UsuariosModule
  ],
  declarations: []
})
export class DictadurasWebModule { }
