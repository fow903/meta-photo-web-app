import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from './services/photos.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PhotosComponent } from './components/photos/photos.component';



@NgModule({
  declarations: [PhotosComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [PhotosService],
  exports: [PhotosComponent]
})
export class PhotosModule { }
