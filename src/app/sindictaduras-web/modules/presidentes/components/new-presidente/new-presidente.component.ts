import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Mixin } from '../../../../../../ui/helpers/mixin-decorator';
import { CanDeactivateMixin } from '../../../../../../ui/helpers/component-can-deactivate';
import { ConfirmDialogComponent } from '../../../../../../ui/modules/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from '../../../../../../common/error-handling/services/toastr.service';
import { ErrorHandlingService } from '../../../../../../common/error-handling/services/error-handling.service';
import { Presidente } from '../../models/presidente';
import {HandledError} from '../../../../../../common/error-handling/models/handled-error';
import {ImagesService} from '../../../../../../ui/modules/image-upload/services/image.service';
import {takeUntil} from 'rxjs/operators';
import {PresidentesService} from '../../services/presidentes.service';

const errorKey = 'Error';

const savedMessageKey = 'Saved';

@Component({
  selector: 'app-new-presidente',
  templateUrl: './new-presidente.component.html',
  styleUrls: ['./new-presidente.component.scss']
})
@Mixin([CanDeactivateMixin])
export class NewPresidenteComponent implements CanDeactivateMixin {

  data: any = {
    name: '',
  };


  // Begin Mixin code of the CanDeactivate class
  unsavedChanges = false;

  cancelBtnKey = 'No';

  okBtnKey = 'Yes';

  saveTitleKey = 'Discard Title';

  saveMessageKey = 'Discard Message';

  modalRef: MatDialogRef<ConfirmDialogComponent>;

  canDeactivate: () => Observable<boolean> | boolean;

  dataChanged: () => void;

  // end

  validationErrors: ValidationErrors;

  file: any;

  // @Input() brands: Array<Brand>;TODO

  // @Output() close = new EventEmitter();TODO

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public activatedRoute: ActivatedRoute,
    private errorHandlingService: ErrorHandlingService,
    public router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public imagesService: ImagesService,
    public presidentesService: PresidentesService
  ) {
  }

  submit(data: Presidente) {
    this.createPresidente(data);
  }

  handleImageChangeEvent(image: any) {
    this.file = image;
    console.log(image);
  }

 createPresidente(data: Presidente) {
   if (this.file !== null && this.file !== undefined) {
     this.imagesService.postImagenPresidente(this.file, 'presidenteId')
         .pipe(takeUntil(this.onDestroy$))
         .subscribe((response) => {
           data.foto = response.data;
           this.save(data);
     });
   }else{
     this.save(data);
   }
 }

 save(data){
    this.presidentesService.postCreatePresidente(data).subscribe(response => {
        this.close();
    })
 }

 cancel() {
    this.close();
 }

  close() {
        this.router.navigate(this.activatedRoute.snapshot.data.closeRouteCommand, { relativeTo: this.activatedRoute });
  }

}
