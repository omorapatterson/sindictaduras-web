import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, } from '@angular/core';
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
//
const errorKey = 'Error';

@Component({
    selector: 'app-presidentes-card',
    templateUrl: './presidentes-card.component.html',
    styleUrls: ['./presidentes-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PresidentesCardComponent {

    @Input() presidente: Presidente;

    @Input() posicion: number = 1;

    constructor(private dialogService: DialogService,
                private svgIconsService: SvgIconsService,
                private presidentesService: PresidentesService
    ) {
        this.svgIconsService.registerIcons();
    }

    mostrarPresidente(){
        const dialogData = {
            presidente: this.presidente
        }
        this.dialogService.openFromComponent(MostrarPresidenteDialogComponent, '50%', '80%', dialogData, 'close-button');
    }

}

