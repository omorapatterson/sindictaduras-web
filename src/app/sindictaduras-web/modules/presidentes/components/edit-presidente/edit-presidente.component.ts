import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import {Observable, Subject} from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { CanDeactivateMixin } from '../../../../../../ui/helpers/component-can-deactivate';
import { Mixin } from '../../../../../../ui/helpers/mixin-decorator';
import { Presidente } from '../../models/presidente';
import { ConfirmDialogComponent } from '../../../../../../ui/modules/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { PresidentesService } from '../../services/presidentes.service';
import { ErrorHandlingService } from '../../../../../../common/error-handling/services/error-handling.service';
import { ToastrService } from '../../../../../../common/error-handling/services/toastr.service';
import { HandledError } from '../../../../../../common/error-handling/models/handled-error';
import { takeUntil } from 'rxjs/operators';
import { ImagesService } from '../../../../../../ui/modules/image-upload/services/image.service';
//
// import { setTranslations } from '@c/ngx-translate';

const errorKey = 'Error';

const updatedMessageKey = 'Updated';

@Component({
  selector: 'app-presidente-task',
  templateUrl: './edit-presidente.component.html',
  styleUrls: ['./edit-presidente.component.scss']
})

@Mixin([CanDeactivateMixin])
export class EditPresidenteComponent implements OnInit, AfterViewInit, CanDeactivateMixin {

  data: Presidente;

  validationErrors: ValidationErrors;

  tasks: Array<Presidente>;

  // Begin Mixin code of the CanDeactivate class
  unsavedChanges = false;

  cancelBtnKey = 'No';

  okBtnKey = 'Yes';

  saveTitleKey = 'Discard Title';

  saveMessageKey = 'Discard Message';

  modalRef: MatDialogRef<ConfirmDialogComponent>;

  canDeactivate: () => Observable<boolean> | boolean;

  dataChanged: () => void;

  presidenteId: string;

  file: any;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public presidentesService: PresidentesService,
    private errorHandlingService: ErrorHandlingService,
    public router: Router,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public imagesService: ImagesService,
  ) {
    // setTranslations(this.translate, TRANSLATIONS);
  }

  ngOnInit(){
    this.presidenteId = this.activatedRoute.snapshot.data.presidenteId;
  }

  ngAfterViewInit() {
    this.getPresidente();
  }

  getPresidente() {
    this.presidentesService.getPresidente(this.presidenteId).subscribe(response => {
      this.data = response.data;
    },
      (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
    )
  }

  submit(data: Presidente) {
    this.updatePresidente(data);
  }

  handleImageChangeEvent(image: any) {
    this.file = image;
    console.log(image);
  }

  updatePresidente(data: Presidente) {
    console.log(this.file);
    if (this.file !== null && this.file !== undefined) {
      this.imagesService.postImagenPresidente(this.file, 'presidenteId')
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((response) => {
            data.foto = response.data;
            this.update(data);
          });
    }else{
      this.update(data);
    }
  }

  update(data){
    this.presidentesService.putEditPresidente(data).subscribe(response => {
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
