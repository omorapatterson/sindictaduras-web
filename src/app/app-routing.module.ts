import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { ProfilepageComponent } from './pages/examples/profilepage/profilepage.component';
import { RegisterpageComponent } from './pages/examples/registerpage/registerpage.component';
import { ConfigResolveService } from '../common/config/services/config-resolve.service';
import { ConfirmarUsuarioComponent } from './sindictaduras-web/modules/usuarios/components/confirmar-usuario/confirmar-usuario.component';
import { ContactPageComponent } from './pages/examples/contact-page/contact-page.component';
import { AuthGuardService } from '../common/authentication/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
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
  { path: 'contact', component: ContactPageComponent },
  {
    path: 'presidentes',
    loadChildren: () => import('./sindictaduras-web/sindictaduras-web.module').then((m) => m.SinDictadurasWebModule),
    canActivate: [ AuthGuardService ],
    resolve: {
      config: ConfigResolveService
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
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
  },
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
