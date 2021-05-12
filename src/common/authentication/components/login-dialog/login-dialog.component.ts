import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
// import { setTranslations } from 'ngx-translate';
import { TRANSLATIONS } from './i18n/login-dialog.component.translations';
//
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
//
import { ConfigService } from '../../../config/services/config.service';
import { BaseReactiveFormComponent } from '../../../../ui/components/base-reactive-form/base-reactive-form-component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from '../../../error-handling/services/toastr.service';
import { RootActionsService } from '../../../ngrx/services/root-actions.service';
import { ErrorHandlingService } from '../../../error-handling/services/error-handling.service';
import { Login } from '../../models/login';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MostrarPresidenteDialogData } from '../../../../app/dictaduras-web/modules/mostrar-presidente-dialog/models/mostrar-presidente-dialog-data';
import { Usuario } from '../../../../app/dictaduras-web/modules/usuarios/models/usuario';
import { UsuariosService } from '../../../../app/dictaduras-web/modules/usuarios/services/usuarios.service';
import { AlertService } from '../../../error-handling/services/alert.service';

const errorKey = 'LoginComponent/Error';
const requiredUserandPasswordKey = 'El email o contraseña no pueden estar vacios.';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent extends BaseReactiveFormComponent<Login> implements OnInit {

    returnUrl: string;

    public capsLockOn: boolean;

    isLogin: boolean = true;

    usuario: Usuario;

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        private router: Router,
        public configService: ConfigService,
        private authService: AuthService,
        private socialAuthService: SocialAuthService,
        public translateService: TranslateService,
        private toastr: ToastrService,
        private errorHandlingService: ErrorHandlingService,
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: MostrarPresidenteDialogData,
        private usuariosService: UsuariosService
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

        this.socialAuthService.authState.subscribe((user) => {
            this.usuario = new Usuario(user);
            this.formGroup.get('userName').setValue(user.email);
            this.formGroup.get('password').setValue(user.id);
            // this.dialogRef.close();
            if (!this.isLogin){
                this.register(true);
            } else {
                this.login();
            }
        }, error => {
            console.log('error');
        });
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
                this.authService.loginUser(userName, password).subscribe((response) => {
                    // this.rootActions.setState(this.authService.userPreferences);
                    console.log(response);
                    /*if (this.returnUrl && this.returnUrl.length > 0) {
                        this.router.navigateByUrl(this.returnUrl);
                    } else {
                        // tslint:disable-next-line:max-line-length
                        this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
                    }*/
                    this.close();
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

    register(signInWithSocialNetwork: boolean = false) {
        if(!signInWithSocialNetwork){
            const userName = this.formGroup.get('userName').value;
            const password = this.formGroup.get('password').value;
            this.usuario = {
                usuario: userName,
                contrasena: password
            };
        }
        this.usuariosService.registrarUsuario(this.usuario).subscribe(response => {
            if(response.data.usuario.signInWithSocialNetwork){
                localStorage.setItem('sindictaduras-token', response.data.token);
                localStorage.setItem('sindictaduras-user', JSON.stringify(response.data.usuario));
                this.alertService.success('Se ha registrado con exito. Gracias', 'OK');
            } else {
                this.alertService.success('Se ha registrado con exito. Le hemos enviado un mail para confirmar su usuario', 'OK');
            }
            this.close();
        },error => {
            this.alertService.error(error.message, 'OK');
        })
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

    close(): void {
        this.dialogRef.close(false);
    }

    registro(isLogin){
        this.isLogin = isLogin;
    }
}
