import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotosService } from './photos.service';
import { HttpClient } from '@angular/common/http';
import { environment as ProdEnviroment } from '../../../../environments/environment.prod';
import { environment as DevEnviroment } from '../../../../environments/environment';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosService]
    });
    service = TestBed.inject(PhotosService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use the correct API URL based on environment', () => {
    if (DevEnviroment.production) {
      expect(service['apiUrl']).toBe(ProdEnviroment.apiUrl);
    } else {
      expect(service['apiUrl']).toBe(DevEnviroment.apiUrl);
    }
  });

  it('should retrieve photos with correct parameters', () => {
    const limit = 10;
    const offset = 0;
    const filters = { title: 'test', 'album.title': 'album', 'album.user.email': 'user@example.com' };

    service.getPhotos(limit, offset, filters).subscribe(photos => {
      expect(photos).toBeTruthy();
    });

    const req = httpMock.expectOne((request) => {
      return request.url === `${service['apiUrl']}/externalapi/photos` &&
        request.params.has('limit') && request.params.get('limit') === limit.toString() &&
        request.params.has('offset') && request.params.get('offset') === offset.toString() &&
        request.params.has('title') && request.params.get('title') === 'test' &&
        request.params.has('album.title') && request.params.get('album.title') === 'album' &&
        request.params.has('album.user.email') && request.params.get('album.user.email') === 'user@example.com';
    });

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

});
