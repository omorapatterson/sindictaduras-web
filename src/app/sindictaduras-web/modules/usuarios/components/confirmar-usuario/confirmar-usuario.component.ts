import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {UsuariosService} from '../../services/usuarios.service';
import {AlertService} from '../../../../../../common/error-handling/services/alert.service';

@Component({
	selector: 'app-confirmar-usuario',
	templateUrl: './confirmar-usuario.component.html',
	styleUrls: ['./confirmar-usuario.component.scss'],
})
export class ConfirmarUsuarioComponent implements OnInit, OnDestroy {
	confirmationCode: string;
	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(
		private route: ActivatedRoute,
		private usersService: UsuariosService,
		private alertService: AlertService,
		private router: Router,
	) {
		this.confirmationCode = this.route.snapshot.params['id'];
		this.confirmUser();
	}

	ngOnInit() {}

	public ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	confirmUser() {
		this.usersService
			.confirmarUsuario(this.confirmationCode)
			.pipe(takeUntil(this.onDestroy$))
			.subscribe(
				(response) => {
					this.manageConfirmUser(response.data);
				},
				(error) => {
					const httpError = error as HttpErrorResponse;
					this.alertService.error('Ocurrió un error: ' + error.message, 'OK');
					// this.authenticationService.logout();
				},
			);
	}

	manageConfirmUser(data: any): any {
		localStorage.setItem('sindictaduras-token', data.token);
		localStorage.setItem('sindictaduras-user', JSON.stringify(data.usuario));
		this.alertService.success('Gracias por validar su usuario', 'OK');
		this.router.navigate(['home']);
	}
}
