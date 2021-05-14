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
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';
import { ZoomImageDialogComponent } from './zoom-image-dialog/zoom-image-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

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
    MatDialogModule,
    TranslateModule,
  ],
  exports: [
    ImageUploadComponent,
    ZoomImageComponent,
    ZoomImageDialogComponent
  ],
  declarations: [
    ImageUploadComponent,
    ZoomImageComponent,
    ZoomImageDialogComponent
  ],
  providers: [NgxImageCompressService],
})
export class ImageUploadModule { }
