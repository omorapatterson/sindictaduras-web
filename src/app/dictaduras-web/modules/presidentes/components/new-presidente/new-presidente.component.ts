import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Mixin } from '../../../../../../ui/helpers/mixin-decorator';
import { CanDeactivateMixin } from '../../../../../../ui/helpers/component-can-deactivate';
import { ConfirmDialogComponent } from '../../../../../../ui/modules/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from '../../../../../../common/error-handling/services/toastr.service';
import { ErrorHandlingService } from '../../../../../../common/error-handling/services/error-handling.service';
import { Presidente } from '../../models/presidente';

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

  constructor(
    public activatedRoute: ActivatedRoute,
    private errorHandlingService: ErrorHandlingService,
    public router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {
  }

  submit(data: Presidente) {
    console.log(data);
    // this.createUser(data);
  }

  handleImageChangeEvent(image: any) {
    this.file = image;
    console.log(image);
  }

 /* createUser(data: Task) {
    this.tasksService.postTask(data).subscribe(response => {
      this.unsavedChanges = false;
      this.close();
      this.toastr.success(savedMessageKey);
    },
      (error: HandledError) => {
        this.errorHandlingService.handleUiError(errorKey, error, 'task');
        this.validationErrors = error.formErrors;
      });
  }*/

  cancel(){

  }
}
