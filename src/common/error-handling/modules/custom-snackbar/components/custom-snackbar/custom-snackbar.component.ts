import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
//
import { TranslateService } from '@ngx-translate/core';
//
import { CustomSnackbarData } from '../../models/custom-snackbar-data';
//
@Component({
	selector: 'app-custom-snackbar',
	templateUrl: './custom-snackbar.component.html',
	styleUrls: ['./custom-snackbar.component.css'],
})
export class CustomSnackbarComponent {
	constructor(
		private translate: TranslateService,
		@Inject(MAT_SNACK_BAR_DATA) public data: CustomSnackbarData,
		private _snackRef: MatSnackBarRef<CustomSnackbarComponent>,
	) {}

	dismiss() {
		this._snackRef.dismiss();
	}
}
