import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../modules/custom-snackbar/components/custom-snackbar/custom-snackbar.component';

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	constructor(private snackBar: MatSnackBar) {}

	success(message: string, action = null) {
		this.snackBar.openFromComponent(CustomSnackbarComponent, {
			data: { messageType: 'Success', messageData: message, messageTitle: action ? action : 'Success' },
			duration: 6000,
			horizontalPosition: 'right',
			panelClass: ['success-snackbar'],
		});
	}

	error(message: string, action = null) {
		this.snackBar.openFromComponent(CustomSnackbarComponent, {
			data: { messageType: 'Error', messageData: message, messageTitle: action ? action : 'Error' },
			duration: 4000,
			horizontalPosition: 'right',
			panelClass: ['error-snackbar'],
		});
	}

	info(message: string, action = null): MatSnackBarRef<CustomSnackbarComponent> {
		return this.snackBar.openFromComponent(CustomSnackbarComponent, {
			data: { messageType: 'Info', messageData: message, messageTitle: action ? action : 'Info' },
			duration: 6000,
			horizontalPosition: 'right',
			panelClass: ['info-snackbar'],
		});
	}
}
