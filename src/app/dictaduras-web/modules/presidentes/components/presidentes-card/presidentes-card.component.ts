import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Presidente} from '../../models/presidente';
import {MostrarPresidenteDialogComponent} from '../../../mostrar-presidente-dialog/components/confirm-dialog/mostrar-presidente-dialog.component';
import {DialogService} from '../../../../../../ui/services/dialog.service';
import {SvgIconsService} from '../../../../../../ui/services/svg-icons.service';
import {PresidentesService} from '../../services/presidentes.service';
import {WebsocketVotacionService} from '../../../../../pages/services/websocket-votacion.service';
//
const errorKey = 'Error';

@Component({
    selector: 'app-presidentes-card',
    templateUrl: './presidentes-card.component.html',
    styleUrls: ['./presidentes-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PresidentesCardComponent implements OnInit{

    @Input() presidente: Presidente;

    @Input() posicion: number = 1;

    constructor(private dialogService: DialogService,
                private svgIconsService: SvgIconsService,
                private websocketVotacionService: WebsocketVotacionService,
                private cdRef: ChangeDetectorRef
    ) {
        this.svgIconsService.registerIcons();
    }

    ngOnInit() {
        // this.conectarAlWebSocketVotacion();
    }

    conectarAlWebSocketVotacion() {
        this.websocketVotacionService.conectarAlWebSocket();
        this.subscribirseALosMensajesDelWebSocketListaDeVenta();
    }

    subscribirseALosMensajesDelWebSocketListaDeVenta() {
        this.websocketVotacionService.enviarMensaje.subscribe((presidente: Presidente) => {
            this.actualizarVotacion(presidente);
        });
    }

    actualizarPresidente(presidente: Presidente){
        if(this.presidente.id === presidente.id){
            this.presidente = presidente;
            this.cdRef.detectChanges();
        }
    }

    actualizarVotacion(presidente: Presidente){
        console.log('Actualizar Votacion');
        /*if(this.presidente.id === presidente.id){
            this.presidente = presidente;
        }*/
    }

    mostrarPresidente(){
        const dialogData = {
            presidente: this.presidente
        }
        this.dialogService.openFromComponent(MostrarPresidenteDialogComponent, '50%', '80%', dialogData, 'close-button');
    }

}

