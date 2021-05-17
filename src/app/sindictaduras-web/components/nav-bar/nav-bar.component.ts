import { Component, OnInit, OnDestroy } from '@angular/core';
import {DialogService} from '../../../../ui/services/dialog.service';
import {AuthService} from '../../../../common/authentication/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html'
})
export class NavBarComponent implements OnInit, OnDestroy {

  isCollapsed = true;

  isLogguedIn = false;

  constructor(
      private authService: AuthService,
      private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.authService.reAuthenticacion.subscribe(response => {
      this.chekcIfIsLogguedIn();
    })
  }

  chekcIfIsLogguedIn(){
    this.isLogguedIn = this.authService.isLoggedIn();
  }

  showLoginDialog(){
    this.dialogService.showLoginDialog();
  }

  logOut(){
    this.authService.logout();
    this.isLogguedIn = false;
  }

  ngOnDestroy() {
  }
}
