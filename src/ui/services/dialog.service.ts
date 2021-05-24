import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../modules/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import {LoginDialogComponent} from '../../common/authentication/components/login-dialog/login-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class DialogService {

	modalRef: MatDialogRef<any>;

	constructor(private dialog: MatDialog) {}

	defaultDialogConfig = {
		width: '50%'
	};

	confirm(data: {
		messageKey: string,
		titleKey?: string,
		okBtnKey?: string,
		messageParam?: { param: any }
	}) {
		const confirmDialogConfig: MatDialogConfig = {
			width: '250px',
			disableClose: true,
			data
		};

		return this.openDialog(
			ConfirmDialogComponent,
			confirmDialogConfig
		).afterClosed();
	}

	customDialogComponent<T>(
		component: T,
		config: MatDialogConfig = this.defaultDialogConfig
	) {
		const dialogRef = this.openDialog(component, config);
		return dialogRef;
	}

	private openDialog(component, config: MatDialogConfig) {
		const dialogRef = this.dialog.open(component, { ...this.defaultDialogConfig, ...config });

		return dialogRef;
	}

	openFromComponent(component, width, heigth,  dialogData?: any, panelClass: string = '',disableClose = true) {
		return this.dialog.open(component, {
			width: width,
			height: heigth,
			data: dialogData,
			autoFocus: false,
			disableClose: disableClose,
			panelClass: panelClass,
		});
	}

	showLoginDialog(){
		if(this.modalRef === undefined || this.modalRef?.componentInstance === null) {
			this.modalRef = this.openFromComponent(LoginDialogComponent, '40%', 'auto', {}, 'close-button-login');
			return this.modalRef;
		}
	}
}
