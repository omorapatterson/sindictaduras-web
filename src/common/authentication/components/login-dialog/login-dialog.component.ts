import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
// import { setTranslations } from 'ngx-translate';
import { TRANSLATIONS } from './i18n/login-dialog.component.translations';
//
import { ConfigService } from '../../../config/services/config.service';
import { BaseReactiveFormComponent } from '../../../../ui/components/base-reactive-form/base-reactive-form-component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from '../../../error-handling/services/toastr.service';
import { RootActionsService } from '../../../ngrx/services/root-actions.service';
import { ErrorHandlingService } from '../../../error-handling/services/error-handling.service';
import { Login } from '../../models/login';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MostrarPresidenteDialogData} from '../../../../app/dictaduras-web/modules/mostrar-presidente-dialog/models/mostrar-presidente-dialog-data';

const errorKey = 'LoginComponent/Error';
const requiredUserandPasswordKey = 'Required Username and Password';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent extends BaseReactiveFormComponent<Login> implements OnInit {

    returnUrl: string;

    public capsLockOn: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public configService: ConfigService,
        private authService: AuthService,
        public translateService: TranslateService,
        private toastr: ToastrService,
        private errorHandlingService: ErrorHandlingService,
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: MostrarPresidenteDialogData,
        // private rootActions: RootActionsService
    ) {
        super(translateService);
        // setTranslations(this.translateService, TRANSLATIONS);
    }

    ngOnInit() {
        this.data = {
            userName: '',
            password: '',
        }
        this.validationErrorMessages = [
            {
                type: 'required',
                key: 'Required Field',
                params: null,
                translation: ''
            }
        ];
        if (this.authService.isAuthenticated) {
            this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
        } else {
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
            this.authService.loginNavigationExtras = undefined;
        }
        this.createFormGroup();
    }

    createFormGroup() {
        this.formGroup = new FormGroup({
            userName: new FormControl(this.data.userName, [Validators.required]),
            password: new FormControl(this.data.password, [Validators.required]),
        });
    }

    login() {
        const userName = this.formGroup.get('userName').value;
        const password = this.formGroup.get('password').value;
        if (this.authService.isAuthenticated) {
            this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
        } else {
            if (userName && password) {
                this.authService.loginUser(userName, password).subscribe((resp) => {
                    // this.rootActions.setState(this.authService.userPreferences);
                    if (this.returnUrl && this.returnUrl.length > 0) {
                        this.router.navigateByUrl(this.returnUrl);
                    } else {
                        // tslint:disable-next-line:max-line-length
                        this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
                    }
                },
                    error => this.errorHandlingService.handleUiError(errorKey, error)
                );
            } else {
                this.translateService.get([requiredUserandPasswordKey, errorKey]).subscribe(translations => {
                    this.toastr.success(requiredUserandPasswordKey);
                });
            }
        }
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
