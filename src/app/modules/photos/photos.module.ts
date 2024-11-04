import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from './services/photos.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PhotosComponent } from './components/photos/photos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [PhotosService],
  exports: [PhotosComponent]
})
export class PhotosModule { }
