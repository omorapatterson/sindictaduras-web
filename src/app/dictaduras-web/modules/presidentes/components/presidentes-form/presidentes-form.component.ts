import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
//
import { TranslateService } from '@ngx-translate/core';
//
import {BaseReactiveFormComponent} from '../../../../../../ui/components/base-reactive-form/base-reactive-form-component';
import {Presidente} from '../../models/presidente';
import {CountryService} from '../../../../../../common/services/country.service';

@Component({
    selector: 'app-presidentes-form',
    templateUrl: './presidentes-form.component.html',
    styleUrls: ['./presidentes-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PresidentesFormComponent extends BaseReactiveFormComponent<Presidente> implements OnInit {

    @Output() imageChange = new EventEmitter<any>();

    countries: any[] = [];

    constructor(
        private countryService: CountryService,
        translateService: TranslateService
    ) {
        super(translateService);
        this.countries = this.countryService.getCountryList();
        // setTranslations(this.translateService, TRANSLATIONS);
    }

    ngOnInit() {
        const validationsErrors: any[] = [
            {
                type: 'required',
                key: 'Required Field',
                params: null,
                translation: ''
            }
        ];

        this.validationErrorMessages = validationsErrors;

        this.createFormGroup();
    }

    createFormGroup() {
        this.formGroup = new FormGroup({
            nombre: new FormControl(this.data.nombre, [Validators.required]),
            apellidos: new FormControl(this.data.nombre, [Validators.required]),
            pais: new FormControl(this.data.pais, [Validators.required]),
            description: new FormControl(this.data.description, [Validators.required]),
        });

    }

    submitClicked() {
        if (this.formGroup.valid) {
            this.accept.emit(this.data);
        } else {
            this.triggerValidation();
        }
    }

    handleImageChangeEvent(image: any) {
        this.imageChange.emit(image);
    }

    handleImageRemoveEvent(image: any) {
        this.imageChange.emit(image);
    }
}

