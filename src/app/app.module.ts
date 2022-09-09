import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
//

import { MatIconModule } from '@angular/material/icon';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MissingTranslationHandler } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PagesModule } from './pages/pages.module';

import { IndexComponent } from './pages/index/index.component';
import { ProfilepageComponent } from './pages/examples/profilepage/profilepage.component';
import { RegisterpageComponent } from './pages/examples/registerpage/registerpage.component';
import { ContactPageComponent } from './pages/examples/contact-page/contact-page.component';
import {TranslationErrorService} from '../common/shared/services/translation-error.service';
//

import { ErrorHandlingModule } from '../common/error-handling/error-handling.module';
import { LoginDialogComponent } from '../common/authentication/components/login-dialog/login-dialog.component';
import { HttpRequestIndicatorModule} from '../common/http-request-indicator/http-request-indicator.module';
import { LoadingComponent } from '../common/http-request-indicator/components/loading/loading.component';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent
    // IndexComponent,
    // ProfilepageComponent,
    // RegisterpageComponent,
    // ContactPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    //
    MatIconModule,
    // BsDropdownModule.forRoot(),
    // ProgressbarModule.forRoot(),
    // TooltipModule.forRoot(),
    // CollapseModule.forRoot(),
    // TabsModule.forRoot(),
    PagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    // PaginationModule.forRoot(),
    // AlertModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    // CarouselModule.forRoot(),
    // ModalModule.forRoot(),
    ErrorHandlingModule,
    HttpRequestIndicatorModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginDialogComponent,
    LoadingComponent
  ]
})
export class AppModule {}
