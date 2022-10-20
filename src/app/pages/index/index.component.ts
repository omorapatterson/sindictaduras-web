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
import {PensamientosService} from '../../sindictaduras-web/modules/presidentes/services/pensamientos.service';
import {Pensamiento} from '../../../common/models/Countries/pensamientos';
import {PrisionerosPoliticosService} from '../../sindictaduras-web/modules/presidentes/services/prisioneros-politicos.service';
import {PrisioneroPolitico} from '../../sindictaduras-web/modules/presidentes/models/prisionero-politico';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss'],
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
  pensamientos: Pensamiento[] = [];
  prisionerosPoliticos: PrisioneroPolitico[] = [];
  prisionerosPoliticosFiltrados: PrisioneroPolitico[] = [];

  prisioneroPolitico: PrisioneroPolitico;

  @ViewChildren(PresidentesCardComponent) presidentesCardComponents: QueryList<PresidentesCardComponent>;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  tiposDePrisionerosPoliticos: string[] = [
      'PRISIONEROS POLÍTICOS',
      'CONVICTOS DE CONCIENCIA',
      'CONDENADOS DE CONCIENCIA',
      'OTROS PRESOS POLÍTICOS',
      'CASOS MAS LONGEVOS'
  ];

  constructor(
      private dialogService: DialogService,
      private svgIconsService: SvgIconsService,
      private presidentesService: PresidentesService,
      private pensamientosService: PensamientosService,
      private prisionerosPoliticosService: PrisionerosPoliticosService,
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
    this.cargarPensamientos();
    this.cargarPrisionerosPoliticos();
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

  actualizarVotacion(presidente: Presidente) {
    this.presidentesCardComponents.forEach(presidentesCardComponent => {
      presidentesCardComponent.actualizarVotacion(presidente);
    });
  }

  cargarPresidentes(){
    this.loadingService.showLoader(true);
    this.presidentesService.getPresidentes().subscribe({
      next: response => {
      this.presidentes = response.data;
      this.conectarAlWebSocketVotacion();
      this.loadingService.showLoader(false);
      },
      error: error => this.errorHandlingService.handleUiError('', error)
    })
  }

  cargarPensamientos() {
    this.pensamientosService.getPensamientos().subscribe({
      next: response => {
        this.pensamientos = response.data;
      },
      error: error => this.errorHandlingService.handleUiError('', error)
    })
  }

  cargarPrisionerosPoliticos() {
    this.prisionerosPoliticosService.getPrisionerosPoliticos().subscribe({
      next: response => {
        this.prisionerosPoliticos = response.data;
        this.prisionerosPoliticosFiltrados = response.data;
      },
      error: error => this.errorHandlingService.handleUiError('', error)
    })
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  mostrarPresidente(fotoUrl: string) {
    this.dialogService.openFromComponent(MostrarPresidenteDialogComponent, '50%', '80%', { foto: fotoUrl }, 'mostrar-presidente-dialog');
  }

  obtenerPosicion(posicion: number) {
    if(posicion > 8){
      posicion = posicion % 8;
    }
    return posicion;
  }

  seleccionarPricioneroPolitico(event: any) {
    this.prisioneroPolitico = event.options[0].value;
  }

  filtrarPrisionerosPoliticos(event: any) {
    const opcionSeleccionada = event.options[0].value;
    this.filtrar(opcionSeleccionada);
  }

  filtrar(opcionSeleccionada: string) {
    switch (opcionSeleccionada) {
      case 'CONVICTOS DE CONCIENCIA':
        this.filtrarOpcionSeleccionada('convictosDeConciencia');
        break;
      case 'CONDENADOS DE CONCIENCIA':
        this.filtrarOpcionSeleccionada('condenadosDeConciencia');
        break;
      case 'OTROS PRESOS POLÍTICOS':
        this.filtrarOpcionSeleccionada('otrosPresosPoliticos');
        break;
      case 'CASOS MAS LONGEVOS':
        this.filtrarOpcionSeleccionada('casosLongevos');
        break;
      default:
        this.prisionerosPoliticosFiltrados = this.prisionerosPoliticos;
        break;
    }
  }

  public filtrarOpcionSeleccionada(opcionSeleccionada: string) {
    this.prisionerosPoliticosFiltrados = this.prisionerosPoliticos.filter(item => {
      return item.tipoDePresoPolitico === opcionSeleccionada;
    })
  }
}
