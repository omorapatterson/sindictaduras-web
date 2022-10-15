import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
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
import {WebsocketVotacionService} from '../../../../../pages/services/websocket-votacion.service';
import {CountryService} from '../../../../../../common/services/country.service';
import {LoadingService} from '../../../../../../common/http-request-indicator/services/loading.service';
import {ErrorHandlingService} from '../../../../../../common/error-handling/services/error-handling.service';
import {AlertService} from '../../../../../../common/error-handling/services/alert.service';

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

  public votacion: Votacion;

  constructor(
      private alertService: AlertService,
      private translate: TranslateService,
      private authService: AuthService,
      private cdRef: ChangeDetectorRef,
      private dialogService: DialogService,
      public dialogRef: MatDialogRef<MostrarPresidenteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MostrarPresidenteDialogData,
      private presidentesService: PresidentesService,
      private svgIconsService: SvgIconsService,
      private votacionService: VotacionService,
      private websocketVotacionService: WebsocketVotacionService,
      private countryService: CountryService,
      private loadingService: LoadingService,
      private errorHandlingService: ErrorHandlingService
  ) {
    this.svgIconsService.registerIcons();
    // setTranslations(this.translate, TRANSLATIONS);
  }

  ngOnInit() {
    this.presidente = this.data.presidente;
    this.votacion = this.data.votacion;
    this.conectarAlWebSocketVotacion();
    this.actualizarUltimaVotacion();
    this.authService.reAuthenticacion.subscribe(response => {
      if (response === true && this.dialogRef?.componentInstance != null && this.dialogRef?.componentInstance !== undefined) {
        this.reAuthenticacion();
      }
    })
  }

  reAuthenticacion(){
    let voto = '';
    if(this.voto !== ''){
      voto = this.voto;
      this.voto = '';
    }
    this.votar(voto);
  }

  conectarAlWebSocketVotacion() {
    this.websocketVotacionService.conectarAlWebSocket();
    this.subscribirseALosMensajesDelWebSocketListaDeVenta();
  }

  subscribirseALosMensajesDelWebSocketListaDeVenta() {
    this.websocketVotacionService.enviarMensaje.subscribe((presidente) => {
      this.actualizarVotacion(JSON.parse(presidente));
    });
  }

  actualizarVotacion(presidente: Presidente){
    if(presidente !== null && presidente !== undefined){
      if(this.presidente.id === presidente.id){
        this.presidente = presidente;
        this.cdRef.detectChanges();
      }
    }
  }

  accept(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(this.votacion);
  }

  votar(voto: string){
    const anteriorVotacion = this.voto;
    if (this.voto === voto) {
      this.voto = '';
    } else {
      this.voto = voto;
    }
    const votacion = new Votacion(this.presidente.id);
    this.loadingService.showLoader(true);
    this.votacionService.realizarVotacion(votacion).subscribe({
      next: response => {
        this.votacion = response.data;
        this.cargarPresidente(this.presidente.id);
        this.loadingService.showLoader(false);
        this.alertService.success('Viva la libertad!!!', '')
      },
      error: error => {
        this.voto = anteriorVotacion !== voto ? voto : '';
        this.errorHandlingService.handleUiError('', error)
      }
    });
  }

  cargarPresidente(presidenteId) {
    this.presidentesService.getPresidente(presidenteId).subscribe(respose => {
      this.presidente = respose.data;
    });
  }

  actualizarUltimaVotacion(){
    if(this.votacion !== null && this.votacion !== undefined){
      if(this.votacion.like){
        this.voto = 'like';
      }else if(this.votacion.disLike){
        this.voto = 'disLike';
      }else if(this.votacion.dictator){
        this.voto = 'dictator';
      }
    }
  }

}
