import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PhotosService } from '../../services/photos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../../../services/loading-service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'albumTitle', 'userEmail', 'photo'];
  dataSource = new MatTableDataSource<any>([]);
  totalPhotos = 0;
  pageSize = 10;
  pageIndex = 0;
  photoLoadStates: { [key: number]: { loaded: boolean; failed: boolean } | undefined } = {};
  backendLoadFailed = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private photosService: PhotosService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.loadingService.show();
    this.backendLoadFailed = false;
    const offset = this.pageIndex * this.pageSize;
    this.photosService.getPhotos(this.pageSize, offset).subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.totalPhotos = 5000;
      },
      error: () => {
        this.backendLoadFailed = true;
        this.snackBar.open('Failed to load photos. Please try again.', 'Retry', {
          duration: 5000
        }).onAction().subscribe(() => {
          this.loadPhotos();
        });
      },
      complete: () => {
        this.loadingService.hide();
      }
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
