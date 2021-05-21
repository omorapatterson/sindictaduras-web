import {Component, OnInit, OnDestroy, ViewChildren, QueryList} from '@angular/core';
import { DialogService } from '../../../ui/services/dialog.service';
import { MostrarPresidenteDialogComponent } from '../../sindictaduras-web/modules/mostrar-presidente-dialog/components/confirm-dialog/mostrar-presidente-dialog.component';
import { SvgIconsService } from '../../../ui/services/svg-icons.service';
import { PresidentesService } from '../../sindictaduras-web/modules/presidentes/services/presidentes.service';
import { Presidente } from '../../sindictaduras-web/modules/presidentes/models/presidente';
import { WebsocketVotacionService } from '../services/websocket-votacion.service';
import { PresidentesCardComponent } from '../../sindictaduras-web/modules/presidentes/components/presidentes-card/presidentes-card.component';
import {LoadingService} from '../../../common/http-request-indicator/services/loading.service';
import {ErrorHandlingService} from '../../../common/error-handling/services/error-handling.service';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  presidentes: Presidente[] = [];

  @ViewChildren(PresidentesCardComponent) presidentesCardComponents: QueryList<PresidentesCardComponent>;

  constructor(private dialogService: DialogService,
              private svgIconsService: SvgIconsService,
              private presidentesService: PresidentesService,
              private websocketVotacionService: WebsocketVotacionService,
              private loadingService: LoadingService,
              private errorHandlingService: ErrorHandlingService
  ) {
    this.svgIconsService.registerIcons();
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.cargarPresidentes();
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
    this.presidentesCardComponents.forEach(presidentesCardComponent => {
      presidentesCardComponent.actualizarVotacion(presidente);
    });
  }

  cargarPresidentes(){
    this.loadingService.showLoader(true);
    this.presidentesService.getPresidentes().subscribe(response => {
      this.presidentes = response.data;
      this.conectarAlWebSocketVotacion();
      this.loadingService.showLoader(false);
    },error => this.errorHandlingService.handleUiError('', error));
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  mostrarPresidente(fotoUrl: string){
    this.dialogService.openFromComponent(MostrarPresidenteDialogComponent, '50%', '80%', { foto: fotoUrl }, 'close-button');
  }

  obtenerPosicion(posicion: number){
    if(posicion > 8){
      posicion = posicion % 8;
    }
    return posicion;
  }
}
