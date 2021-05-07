import {Component, Inject, Input, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { setTranslations } from '@c/ngx-translate';
import { TRANSLATIONS } from './i18n/mostrar-presidente-dialog.translations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MostrarPresidenteDialogData} from '../../models/mostrar-presidente-dialog-data';
import {SvgIconsService} from '../../../../../../ui/services/svg-icons.service';

import { DialogService } from '../../../../../../ui/services/dialog.service';
import { LoginDialogComponent } from '../../../../../../common/authentication/components/login-dialog/login-dialog.component';
import { Presidente } from '../../../presidentes/models/presidente';
import { AuthService } from '../../../../../../common/authentication/services/auth.service';
import { Votacion } from '../../../votacion/models/votacion';
import { VotacionService } from '../../../votacion/services/votacion.service';
import {PresidentesService} from '../../../presidentes/services/presidentes.service';

@Component({
  selector: 'app-mostrar-presidente-dialog',
  templateUrl: './mostrar-presidente-dialog.component.html',
  styleUrls: ['./mostrar-presidente-dialog.component.css']
})

export class MostrarPresidenteDialogComponent implements OnInit{

  public titleKey = 'Title';

  public messageKey = 'Message';

  public messageParam: any = {};

  public okBtnKey = 'Accept';

  public cancelBtnKey = 'Cancel';

  public presidente: Presidente;

  public voto = '';

  constructor(
      private translate: TranslateService,
      private authService: AuthService,
      private dialogService: DialogService,
      public dialogRef: MatDialogRef<MostrarPresidenteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MostrarPresidenteDialogData,
      private presidentesService: PresidentesService,
      private svgIconsService: SvgIconsService,
      private votacionService: VotacionService
  ) {
    this.svgIconsService.registerIcons();
    // setTranslations(this.translate, TRANSLATIONS);
  }

  ngOnInit() {
    this.presidente = this.data.presidente;
  }

  accept(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  votar(voto: string){
    this.voto = voto;
    const votacion = new Votacion(this.presidente.id, voto);
    this.votacionService.realizarVotacion(votacion).subscribe(response => {
      this.cargarPresidente(this.presidente.id);
    });
  }

  cargarPresidente(presidenteId){
    this.presidentesService.getPresidente(presidenteId).subscribe(respose => {
      this.presidente = respose.data;
    });
  }
}
