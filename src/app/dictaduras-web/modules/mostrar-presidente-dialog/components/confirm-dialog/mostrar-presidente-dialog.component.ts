import { Component, Inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { setTranslations } from '@c/ngx-translate';
import { TRANSLATIONS } from './i18n/mostrar-presidente-dialog.translations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MostrarPresidenteDialogData} from '../../models/mostrar-presidente-dialog-data';
import {SvgIconsService} from '../../../../../../ui/services/svg-icons.service';

import { DialogService } from '../../../../../../ui/services/dialog.service';
import { LoginDialogComponent } from '../../../../../../common/authentication/components/login-dialog/login-dialog.component';

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

  constructor(
      private translate: TranslateService,
      private dialogService: DialogService,
      public dialogRef: MatDialogRef<MostrarPresidenteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MostrarPresidenteDialogData,
      private svgIconsService: SvgIconsService
  ) {
    this.svgIconsService.registerIcons();
    // setTranslations(this.translate, TRANSLATIONS);
  }

  accept(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  showLoginDialog(){
    this.dialogRef.close(false);
    this.dialogService.openFromComponent(LoginDialogComponent, '40%', 'auto', {}, 'close-button-login');
  }
}
