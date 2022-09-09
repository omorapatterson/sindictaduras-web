import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject, OnDestroy
} from '@angular/core';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ErrorHandlingService } from '../common/error-handling/services/error-handling.service';
import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';
import { AuthService } from '../common/authentication/services/auth.service';
import { DialogService } from '../ui/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private dialogService: DialogService,
    private renderer: Renderer2,
    public location: Location,
    @Inject(DOCUMENT) document,
    private errorHandlingService: ErrorHandlingService,
    private translate: TranslateService,
    private authService: AuthService
  ) {
    translate.setDefaultLang('en');
    this.authService.loginCommands = ['/login'];
    this.authService.afterLoginCommands = ['/home'];
    this.authService.logoutCommands = ['/logout'];
    this.authService.changePasswordCommands = ['/home'];
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      const element = document.getElementById('navbar-top');
      if (element) {
        element.classList.remove('navbar-transparent');
        // element.classList.add('bg-danger');
      }
    } else {
      const element = document.getElementById('navbar-top');
      if (element) {
        element.classList.add('navbar-transparent');
        // element.classList.remove('bg-danger');
      }
    }
  }

  ngOnInit() {
    this.onWindowScroll(event);
    this.errorHandlingService.showExpireLogin.pipe(takeUntil(this.onDestroy$)).subscribe((userDetails) => {
      localStorage.removeItem('sindictaduras-token');
      this.dialogService.showLoginDialog();
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
