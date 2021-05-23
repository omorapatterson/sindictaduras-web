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
import {CountryService} from '../../../../../../common/services/country.service';
import {AuthService} from '../../../../../../common/authentication/services/auth.service';
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

    constructor(
                private countryService: CountryService,
                private dialogService: DialogService,
                private authService: AuthService,
                private svgIconsService: SvgIconsService,
                private cdRef: ChangeDetectorRef,
                private votacionService: VotacionService,
    ) {
        this.svgIconsService.registerIcons();
    }

    ngOnInit() {
        this.cargarVotacion(this.presidente.id);
        this.authService.reAuthenticacion.subscribe(response => {
            this.cargarVotacion(this.presidente.id);
        });
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
        const dialogRef = this.dialogService.openFromComponent(MostrarPresidenteDialogComponent, '50%', '80%', dialogData, 'close-button');
        dialogRef.afterClosed().subscribe(response => {
           this.votacion = response;
           this.cdRef.detectChanges();
        })
    }

    cargarVotacion(presidenteId){
        this.votacionService.cargarVotacion(presidenteId).subscribe(respose => {
            this.votacion = respose.data;
            if(this.votacion === null || this.votacion === undefined){
                this.votacion = new Votacion('', '');
            }
            this.cdRef.detectChanges();
        });
    }

    mostrarTexto(mostrarVoto){
        this.mostrarVoto = mostrarVoto;
    }
}

