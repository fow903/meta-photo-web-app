import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ProdEnviroment } from '../../../../environments/environment.prod';
import { environment as DevEnviroment } from '../../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { MappedFilters } from '../interfaces/filters';
import { AcceptedFilters } from '../enums/accepted.filters';

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

  getPhotos(limit: number, offset: number, filters: MappedFilters = {}): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    Object.keys(filters).forEach((key: string) => {
      params = params.set(key, filters[key]);
    });

    const acceptedFilters: AcceptedFilters[] = [
      AcceptedFilters.Title,
      AcceptedFilters.AlbumTitle,
      AcceptedFilters.AlbumUserEmail,
    ];

    Object.keys(filters).forEach(key => {
      if (acceptedFilters.includes(key as AcceptedFilters) && filters[key]) {
        params = params.set(key as AcceptedFilters, filters[key]);
      }
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/externalapi/photos`, { params });
  }
}
