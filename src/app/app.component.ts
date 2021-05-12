import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject, OnDestroy
} from '@angular/core';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import {ErrorHandlingService} from '../common/error-handling/services/error-handling.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LoginDialogComponent} from '../common/authentication/components/login-dialog/login-dialog.component';
import {AuthService} from '../common/authentication/services/auth.service';
import {DialogService} from '../ui/services/dialog.service';
import {SocialAuthService} from 'angularx-social-login';

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
    private socialAuthService: SocialAuthService,
  ) {}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      const element = document.getElementById('navbar-top');
      if (element) {
        element.classList.remove('navbar-transparent');
        element.classList.add('bg-danger');
      }
    } else {
      const element = document.getElementById('navbar-top');
      if (element) {
        element.classList.add('navbar-transparent');
        element.classList.remove('bg-danger');
      }
    }
  }
  ngOnInit() {
    this.onWindowScroll(event);
    this.errorHandlingService.showExpireLogin.pipe(takeUntil(this.onDestroy$)).subscribe((userDetails) => {
      localStorage.removeItem('sindictaduras-token');
      this.socialAuthService.signOut();
      this.dialogService.showLoginDialog();
      // this.authenticationService.tokenIsFresh.next(false);
      // this.authenticationService.openLoginDialog();
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
