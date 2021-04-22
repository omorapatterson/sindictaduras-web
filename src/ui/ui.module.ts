import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import {
  MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule,
  MatNativeDateModule, MatRadioModule, MatSliderModule, MatSlideToggleModule
} from '@angular/material';

import 'hammerjs';
import 'hammer-timejs';
//
import { AlertDialogModule } from './modules/alert-dialog/alert-dialog.module';
import { AskBeforeCancelModule } from './modules/ask-before-cancel/ask-before-cancel.module';
import { AskBeforeRefreshModule } from './modules/ask-before-refresh/ask-before-refresh.module';
import { CapitalizeWordModule } from './modules/capitalize-word/capitalize-word.module';
import { CapsLockModule } from './modules/caps-lock/caps-lock.module';
import { ConfirmDialogModule } from './modules/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogMessageModule } from './modules/confirm-dialog-message/confirm-dialog-message.module';
import { ErrorMessagesModule } from './modules/error-messages/error-messages.module';
import { LogoModule } from './modules/logo/logo.module';
import { SessionExpireDialogModule } from './modules/session-expire-dialog/session-expire-dialog.module';
import { SpinnerIndicator200Module } from './modules/spinner-indicator-200/spinner-indicator-200.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    //
    AlertDialogModule,
    AskBeforeCancelModule,
    AskBeforeRefreshModule,
    CapitalizeWordModule,
    CapsLockModule,
    ConfirmDialogModule,
    ErrorMessagesModule,    
    LogoModule,
    SessionExpireDialogModule,
    SpinnerIndicator200Module,
    ConfirmDialogMessageModule
  ],
  declarations: []
})
export class UiModule { }
