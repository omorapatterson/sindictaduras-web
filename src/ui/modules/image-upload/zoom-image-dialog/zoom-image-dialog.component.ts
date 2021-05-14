import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-zoom-image-dialog',
	templateUrl: './zoom-image-dialog.component.html',
	styleUrls: ['./zoom-image-dialog.component.scss'],
})
export class ZoomImageDialogComponent implements OnInit {
	public imgURL: string = './assets/img/no-image-available.png';

	constructor(@Inject(MAT_DIALOG_DATA) public dataReceived: any) {}

	ngOnInit(): void {
		this.imgURL = this.dataReceived.imgURL;
	}
}
