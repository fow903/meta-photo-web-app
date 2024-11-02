import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosComponent } from './photos.component';
import { PhotosService } from '../../services/photos.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../../../../services/loading-service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';

class MockPhotosService {
  getPhotos(pageSize: number, offset: number, filters: any) {
    return of({
      data: [
        { id: 1, title: 'Photo 1', album: { title: 'Album 1', user: { email: 'user1@example.com' } }, thumbnailUrl: 'url1' },
        { id: 2, title: 'Photo 2', album: { title: 'Album 2', user: { email: 'user2@example.com' } }, thumbnailUrl: 'url2' }
      ],
      count: 2
    });
  }
}

class MockLoadingService {
  show() {}
  hide() {}
}

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let photosService: PhotosService;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      imports: [
        MatSnackBarModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: PhotosService, useClass: MockPhotosService },
        { provide: LoadingService, useClass: MockLoadingService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    photosService = TestBed.inject(PhotosService);
    loadingService = TestBed.inject(LoadingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on initialization', () => {
    spyOn(photosService, 'getPhotos').and.callThrough();
    component.ngOnInit();
    expect(photosService.getPhotos).toHaveBeenCalledWith(component.pageSize, 0, component.mapFilters(component.filters));
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should handle backend load failure', () => {
    spyOn(photosService, 'getPhotos').and.returnValue(throwError('Error'));
    spyOn(loadingService, 'hide');
    component.loadPhotos();
    expect(component.backendLoadFailed).toBeTrue();
    expect(loadingService.hide).toHaveBeenCalled();
  });

  it('should call loadPhotos on page change', () => {
    spyOn(component, 'loadPhotos');
    component.onPageChange({ pageSize: 20, pageIndex: 1 } as any);
    expect(component.loadPhotos).toHaveBeenCalled();
    expect(component.pageSize).toBe(20);
    expect(component.pageIndex).toBe(1);
  });

  it('should reset pagination when applying filters', () => {
    spyOn(component.paginator, 'firstPage');
    component.applyFilters();
    expect(component.paginator.firstPage).toHaveBeenCalled();
  });

  it('should update photo load state on photo load success', () => {
    component.onPhotoLoad(1);
    expect(component.photoLoadStates[1]).toEqual({ loaded: true, failed: false });
  });

  it('should update photo load state on photo load failure', () => {
    component.onPhotoError(1);
    expect(component.photoLoadStates[1]).toEqual({ loaded: false, failed: true });
  });

  it('should trigger debounced filter application on input', () => {
    spyOn(component, 'debouncedApplyFilters');
    const input = fixture.debugElement.query(By.css('input[matInput]')).nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.debouncedApplyFilters).toHaveBeenCalled();
  });
});
