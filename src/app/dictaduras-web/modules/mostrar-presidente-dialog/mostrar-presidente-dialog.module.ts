import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
//
import { TranslateModule } from '@ngx-translate/core';
//
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MostrarPresidenteDialogComponent} from './components/confirm-dialog/mostrar-presidente-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    MostrarPresidenteDialogComponent
  ],
  exports: [
    MostrarPresidenteDialogComponent
  ]
})
export class MostrarPresidenteDialogModule {
}
