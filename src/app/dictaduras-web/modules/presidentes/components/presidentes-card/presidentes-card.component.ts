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
import {VotacionService} from '../../../votacion/services/votacion.service';
import {Votacion} from '../../../votacion/models/votacion';
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

    public votacion: Votacion;

    public mostrarVoto: false;

    constructor(private dialogService: DialogService,
                private svgIconsService: SvgIconsService,
                private cdRef: ChangeDetectorRef,
                private votacionService: VotacionService,
    ) {
        this.svgIconsService.registerIcons();
    }

    ngOnInit() {
        this.cargarVotacion(this.presidente.id);
    }

    actualizarVotacion(presidente: Presidente){
        if(this.presidente.id === presidente.id){
            this.presidente = presidente;
            this.cdRef.detectChanges();
        }
    }

    mostrarPresidente(){
        const dialogData = {
            presidente: this.presidente,
            votacion: this.votacion
        }
        this.dialogService.openFromComponent(MostrarPresidenteDialogComponent, '50%', '80%', dialogData, 'close-button');
    }

    cargarVotacion(presidenteId){
        this.votacionService.cargarVotacion(presidenteId).subscribe(respose => {
            this.votacion = respose.data;
        });
    }

    mostrarTexto(mostrarVoto){
        console.log(mostrarVoto);
        this.mostrarVoto = mostrarVoto;
    }
}

