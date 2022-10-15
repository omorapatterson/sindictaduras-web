import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//
import { PresidentesCardComponent } from './components/presidentes-card/presidentes-card.component';
import { PresidentesFormComponent } from './components/presidentes-form/presidentes-form.component';
import { ErrorMessagesModule } from '../../../../ui/modules/error-messages/error-messages.module';
import { AskBeforeRefreshModule } from '../../../../ui/modules/ask-before-refresh/ask-before-refresh.module';
import { NewPresidenteComponent } from './components/new-presidente/new-presidente.component';
import { PresidentesTableComponent } from './components/presidentes-table/presidentes-table.component';
import { MsPresidentesRoutingModule } from './presidentes-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadModule } from '../../../../ui/modules/image-upload/image-upload.module';
import { EditPresidenteComponent } from './components/edit-presidente/edit-presidente.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatAutocompleteModule,
    TranslateModule,
    //
    ErrorMessagesModule,
    AskBeforeRefreshModule,
    MsPresidentesRoutingModule,
    ImageUploadModule,
    NgxSkeletonLoaderModule.forRoot(),
  ],
  exports: [
    PresidentesCardComponent,
    PresidentesFormComponent,
    NewPresidenteComponent,
    PresidentesTableComponent,
    EditPresidenteComponent
  ],
  declarations: [
    PresidentesCardComponent,
    PresidentesFormComponent,
    NewPresidenteComponent,
    PresidentesTableComponent,
    EditPresidenteComponent
  ]
})
export class PresidentesModule { }
