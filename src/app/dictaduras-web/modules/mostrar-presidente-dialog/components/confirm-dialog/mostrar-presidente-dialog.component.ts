import { Component, Inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { setTranslations } from '@c/ngx-translate';
import { TRANSLATIONS } from './i18n/mostrar-presidente-dialog.translations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MostrarPresidenteDialogData} from '../../models/mostrar-presidente-dialog-data';

@Component({
  selector: 'app-mostrar-presidente-dialog',
  templateUrl: './mostrar-presidente-dialog.component.html',
  styleUrls: ['./mostrar-presidente-dialog.component.css']
})

export class MostrarPresidenteDialogComponent {

  public titleKey = 'Title';

  public messageKey = 'Message';

  public messageParam: any = {};

  public okBtnKey = 'Accept';

  public cancelBtnKey = 'Cancel';

  constructor(private translate: TranslateService, public dialogRef: MatDialogRef<MostrarPresidenteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MostrarPresidenteDialogData) {
    // setTranslations(this.translate, TRANSLATIONS);
  }

  accept(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
