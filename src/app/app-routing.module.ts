import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { ProfilepageComponent } from './pages/examples/profilepage/profilepage.component';
import { RegisterpageComponent } from './pages/examples/registerpage/registerpage.component';
import { LandingpageComponent } from './pages/examples/landingpage/landingpage.component';
import { ConfigResolveService } from '../common/config/services/config-resolve.service';
import { ConfirmarUsuarioComponent } from './dictaduras-web/modules/usuarios/components/confirmar-usuario/confirmar-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: IndexComponent,
    resolve: {
      config: ConfigResolveService
    }
  },
  { path: 'profile', component: ProfilepageComponent },
  { path: 'register', component: RegisterpageComponent },
  {
    path: 'confirmar/:id',
    component: ConfirmarUsuarioComponent,
    resolve: {
      config: ConfigResolveService
    }
  },
  { path: 'landing', component: LandingpageComponent }
];


/*
const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'backoffice',
    loadChildren: './ms-back-office/ms-back-office.module#MsBackOfficeModule',
    // canActivate: [AuthGuardService],
    resolve: {
      config: ConfigResolveService
    }
  },
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];
*/

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: []
})
export class AppRoutingModule {}
