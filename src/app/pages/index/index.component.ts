import {Component, OnInit, OnDestroy, ViewChildren, QueryList} from '@angular/core';
import noUiSlider from 'nouislider';
import { DialogService } from '../../../ui/services/dialog.service';
import { MostrarPresidenteDialogComponent } from '../../dictaduras-web/modules/mostrar-presidente-dialog/components/confirm-dialog/mostrar-presidente-dialog.component';
import {SvgIconsService} from '../../../ui/services/svg-icons.service';
import {PresidentesService} from '../../dictaduras-web/modules/presidentes/services/presidentes.service';
import { Presidente } from '../../dictaduras-web/modules/presidentes/models/presidente';
import { WebsocketVotacionService } from '../services/websocket-votacion.service';
import {PresidentesCardComponent} from '../../dictaduras-web/modules/presidentes/components/presidentes-card/presidentes-card.component';

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

    const slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    const slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
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
}
