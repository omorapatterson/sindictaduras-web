import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PagesModule } from './pages/pages.module';

import { ErrorHandlingModule } from '../common/error-handling/error-handling.module';
import { LoginDialogComponent } from '../common/authentication/components/login-dialog/login-dialog.component';
import { HttpRequestIndicatorModule} from '../common/http-request-indicator/http-request-indicator.module';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CarouselModule } from 'ngx-bootstrap/carousel';

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
        BsDropdownModule,
        SocialLoginModule,
        CarouselModule.forRoot(),
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('338812207472-rk6qb8op96n8rphaa3bptk8mt0psgq2e.apps.googleusercontent.com')
                    }
                ],
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
