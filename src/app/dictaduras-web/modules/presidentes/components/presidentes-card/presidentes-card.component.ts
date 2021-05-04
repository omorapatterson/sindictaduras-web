import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Presidente} from '../../models/presidente';
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

    constructor(){

    }

}

