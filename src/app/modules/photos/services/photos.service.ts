import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ProdEnviroment } from '../../../../environments/environment.prod';
import { environment as DevEnviroment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private apiUrl;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.apiUrl = DevEnviroment.apiUrl;
    } else {
      this.apiUrl = ProdEnviroment.apiUrl;
    }
  }

  getPhotos(limit: number, offset: number, filters: any = {}): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    Object.keys(filters).forEach(key => {
      params = params.set(key, filters[key]);
    });
    const acceptedFilters = ['title', 'album.title', 'album.user.email'];

    Object.keys(filters).forEach(key => {
      if (acceptedFilters.includes(key) && filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any>(`${this.apiUrl}/externalapi/photos`, { params });
  }
}
