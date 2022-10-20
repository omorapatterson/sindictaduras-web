import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { IndexComponent } from './index/index.component';
import { ProfilepageComponent } from './examples/profilepage/profilepage.component';
import { RegisterpageComponent } from './examples/registerpage/registerpage.component';
import { UiModule } from '../../ui/ui.module';
import { MatIconModule } from '@angular/material/icon';
import { PresidentesModule } from '../sindictaduras-web/modules/presidentes/presidentes.module';
import { SinDictadurasWebModule } from '../sindictaduras-web/sindictaduras-web.module';
import { ContactPageComponent } from './examples/contact-page/contact-page.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        CollapseModule.forRoot(),
        JwBootstrapSwitchNg2Module,
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        UiModule,
        SinDictadurasWebModule,
        MatIconModule,
        PresidentesModule,
        MatTooltipModule,
        MatListModule,
        NgbModule,
        FlexLayoutModule,
        MatMenuModule,
        MatButtonModule
    ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    ContactPageComponent
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    ContactPageComponent
  ],
  providers: []
})
export class PagesModule {}
