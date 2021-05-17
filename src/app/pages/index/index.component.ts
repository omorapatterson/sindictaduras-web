import {Component, OnInit, OnDestroy, ViewChildren, QueryList} from '@angular/core';
import { DialogService } from '../../../ui/services/dialog.service';
import { MostrarPresidenteDialogComponent } from '../../sindictaduras-web/modules/mostrar-presidente-dialog/components/confirm-dialog/mostrar-presidente-dialog.component';
import { SvgIconsService } from '../../../ui/services/svg-icons.service';
import { PresidentesService } from '../../sindictaduras-web/modules/presidentes/services/presidentes.service';
import { Presidente } from '../../sindictaduras-web/modules/presidentes/models/presidente';
import { WebsocketVotacionService } from '../services/websocket-votacion.service';
import { PresidentesCardComponent } from '../../sindictaduras-web/modules/presidentes/components/presidentes-card/presidentes-card.component';

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
              private websocketVotacionService: WebsocketVotacionService
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
    this.presidentesService.getPresidentes().subscribe(response => {
      this.presidentes = response.data;
      this.conectarAlWebSocketVotacion();
    });
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
