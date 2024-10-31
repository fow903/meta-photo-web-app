import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'albumTitle','userEmail', 'photo'];
  dataSource = new MatTableDataSource<any>([]);
  totalPhotos = 0;
  pageSize = 10;
  pageIndex = 0;
  photoLoadStates: { [key: number]: { loaded: boolean; failed: boolean } } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    const offset = this.pageIndex * this.pageSize;
    this.photosService.getPhotos(this.pageSize, offset).subscribe(response => {
      this.dataSource.data = response;
      this.totalPhotos = 5000;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadPhotos();
  }

  onPhotoLoad(photoId: number): void {
    this.photoLoadStates[photoId] = { loaded: true, failed: false };
  }

  onPhotoError(photoId: number): void {
    this.photoLoadStates[photoId] = { loaded: false, failed: true };
  }

}
