import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ZoomImageDialogComponent } from '../zoom-image-dialog/zoom-image-dialog.component';
import {DialogService} from '../../../services/dialog.service';

@Component({
	selector: 'app-zoom-image',
	templateUrl: './zoom-image.component.html',
	styleUrls: ['./zoom-image.component.scss'],
})
export class ZoomImageComponent implements OnInit {
	@ViewChild('img', { static: false, read: ElementRef }) img;
	@ViewChild('len', { static: false, read: ElementRef }) lens;

	@Input('img') imagen: string;
	@Input() zoom = 5;
	@Input() lenSize = 40;
	@Input() divZoomOutput: ElementRef;
	@Input() showLens: boolean = false;

	public posX: number = 0;
	public posY: number = 0;
	private ratioX: number = 1;
	private ratioY: number = 1;

	@HostListener('mousemove', ['$event'])
	mouseMove(event: any) {
		const zoomPosition = this.moveLens(event);
		this.render.setStyle(this.divZoomOutput, 'background-position', zoomPosition);
	}

	constructor(private render: Renderer2, private dialogService: DialogService) {}

	ngOnInit(): void {}

	public onLoad(): void {
		this.setZoomOutputStyle();
		this.setRatios();
	}

	private setRatios() {
		const zoomOutputRectangle = (this.divZoomOutput as any).getBoundingClientRect();
		this.ratioX = this.calculateRatioBetweenDivAndLens(
			zoomOutputRectangle.width,
			this.img.nativeElement.width,
			this.lens.nativeElement.offsetWidth,
		);
		this.ratioY = this.calculateRatioBetweenDivAndLens(
			zoomOutputRectangle.height,
			this.img.nativeElement.height,
			this.lens.nativeElement.offsetHeight,
		);
	}

	private calculateRatioBetweenDivAndLens(
		rectangleMeasurement: number,
		nativeMeasurement: number,
		offsetMeasurement: number,
	): number {
		return (rectangleMeasurement - nativeMeasurement * this.zoom) / (nativeMeasurement - offsetMeasurement);
	}

	private setZoomOutputStyle(): void {
		this.render.setStyle(this.divZoomOutput, 'background-image', "url('" + this.imagen + "')");
		this.render.setStyle(
			this.divZoomOutput,
			'background-size',
			this.img.nativeElement.width * this.zoom + 'px ' + this.img.nativeElement.height * this.zoom + 'px',
		);
	}

	private moveLens(e: any): string {
		e.preventDefault(); /*prevent any other actions that may occur when moving over the image:*/
		this.setLensPositions(e);

		/*returns what the lens "sees":*/
		return this.posX * this.ratioX + 'px ' + this.posY * this.ratioY + 'px';
	}

	private setLensPositions(e: any): void {
		let cursorPosition = this.getCursorPosition(e);
		let lensPositionX = this.calculateLensPosition(cursorPosition.x, this.lens.nativeElement.offsetWidth);
		let lensPositionY = this.calculateLensPosition(cursorPosition.y, this.lens.nativeElement.offsetHeight);

		this.posX = this.setLensOuterLimits(
			lensPositionX,
			this.img.nativeElement.width,
			this.lens.nativeElement.offsetWidth,
		);
		this.posY = this.setLensOuterLimits(
			lensPositionY,
			this.img.nativeElement.height,
			this.lens.nativeElement.offsetHeight,
		);
	}

	private calculateLensPosition(axis: number, offsetMeasurement: number): number {
		return axis - offsetMeasurement / 2;
	}

	private setLensOuterLimits(axis: number, nativeMeasurement: number, offsetMeasurement: number): number {
		if (axis > nativeMeasurement - offsetMeasurement) {
			axis = nativeMeasurement - offsetMeasurement;
		}
		if (axis < 0) {
			axis = 0;
		}
		return axis;
	}

	private getCursorPosition(e): any {
		e = e || window.event;
		return this.getImagePositions(e);
	}

	private considerPageScrolling(x: number, y: number) {
		x = x - window.pageXOffset;
		y = y - window.pageYOffset;
		return { x, y };
	}

	private getImagePositions(e: any) {
		/*get the x and y positions of the image:*/
		let imgRectangle = this.img.nativeElement.getBoundingClientRect();
		let x = this.calculateCursorCoordinate(e.pageX, imgRectangle.left);
		let y = this.calculateCursorCoordinate(e.pageY, imgRectangle.top);
		return this.considerPageScrolling(x, y);
	}

	private calculateCursorCoordinate(pageCoordinate: any, imgCoordinate: any) {
		/*calculate the cursor's x and y coordinates, relative to the image:*/
		return pageCoordinate - imgCoordinate;
	}

	public clickZoom(): void {
		this.dialogService.openFromComponent(ZoomImageDialogComponent, 'auto', { imgURL: this.imagen }, false);
	}
}
