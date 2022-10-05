import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
//
import { TranslateService } from '@ngx-translate/core';
//
import { BaseReactiveFormComponent } from '../../../../../../ui/components/base-reactive-form/base-reactive-form-component';
import { Presidente } from '../../models/presidente';
import { CountryService } from '../../../../../../common/services/country.service';

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
        this.formGroup = new UntypedFormGroup({
            nombre: new UntypedFormControl(this.data.nombre, [Validators.required]),
            apellidos: new UntypedFormControl(this.data.apellidos, [Validators.required]),
            pais: new UntypedFormControl(this.data.pais, [Validators.required]),
            biografia: new UntypedFormControl(this.data.biografia),
            mandatos: new UntypedFormControl(this.data.mandatos),
            descripcion: new UntypedFormControl(this.data.descripcion),
        });

    }

    submitClicked() {
        if (this.formGroup.valid) {
            this.data.paisCode = this.countryService.getCodeByCountry(this.formGroup.get('pais').value);
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

