import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Presidente } from '../../models/presidente';
import { MostrarPresidenteDialogComponent } from '../../../mostrar-presidente-dialog/components/confirm-dialog/mostrar-presidente-dialog.component';
import { DialogService } from '../../../../../../ui/services/dialog.service';
import { SvgIconsService } from '../../../../../../ui/services/svg-icons.service';
import { VotacionService } from '../../../votacion/services/votacion.service';
import { Votacion } from '../../../votacion/models/votacion';
import { CountryService } from '../../../../../../common/services/country.service';
import { AuthService } from '../../../../../../common/authentication/services/auth.service';
import {AlertService} from '../../../../../../common/error-handling/services/alert.service';

@Component({
    selector: 'app-presidentes-card',
    templateUrl: './presidentes-card.component.html',
    styleUrls: ['./presidentes-card.component.scss'],
})

export class PresidentesCardComponent implements OnInit{

    @Input() presidente: Presidente;

    @Input() posicion: number = 1;

    public votacion: Votacion;

    public mostrarVoto: false;

    public voto;

    showLoader = false;

    constructor(
        private alertService: AlertService,
        private countryService: CountryService,
        private dialogService: DialogService,
        private authService: AuthService,
        private svgIconsService: SvgIconsService,
        private cdRef: ChangeDetectorRef,
        private votacionService: VotacionService
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
        const dialogRef = this.dialogService.openFromComponent(MostrarPresidenteDialogComponent, '50%', '80%', dialogData, 'mostrar-presidente-dialog');
        dialogRef.afterClosed().subscribe(response => {
           this.votacion = response;
           this.cdRef.detectChanges();
        })
    }

    cargarVotacion(presidenteId) {
        this.votacion = new Votacion(presidenteId);
        this.votacionService.cargarVotacion(presidenteId).subscribe({
            next: respose => {
                this.votacion = respose.data;
                if (this.votacion === null || this.votacion === undefined) {
                    this.votacion = new Votacion('');
                }
                this.cdRef.detectChanges();
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    votarLike() {
        this.votacion.like = !this.votacion.like;
        this.votacion.disLike = false;
        this.votacion.dictator = false;
        this.cdRef.detectChanges();
        this.enviarVotacion(this.votacion);
    }

    votarDisLike() {
        this.votacion.like = false;
        this.votacion.disLike = !this.votacion.disLike;
        this.votacion.dictator = false;
        this.cdRef.detectChanges();
        this.enviarVotacion(this.votacion);
    }

    votarDictator() {
        this.votacion.like = false;
        this.votacion.disLike = false;
        this.votacion.dictator = !this.votacion.dictator;
        this.cdRef.detectChanges();
        this.enviarVotacion(this.votacion);
    }

    public enviarVotacion(votacion: Votacion) {
        this.showLoader = true;
        votacion.spresidente = this.presidente.id;
        this.votacionService.realizarVotacion(votacion).subscribe({
            next: response => {
                this.votacion = response.data;
                this.presidente.likeCount = this.votacion.presidente.likeCount;
                this.presidente.disLikeCount = this.votacion.presidente.disLikeCount;
                this.presidente.dictatorCount = this.votacion.presidente.dictatorCount;
                this.cdRef.detectChanges();
                this.showLoader = false;
            },
            error: error => {
                this.showLoader = false;
                // this.voto = anteriorVotacion !== voto ? voto : '';
            }
        });
    }

    mostrarTexto(mostrarVoto){
        this.mostrarVoto = mostrarVoto;
    }
}

