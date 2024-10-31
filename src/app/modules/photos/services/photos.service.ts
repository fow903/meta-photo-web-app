import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPhotos(limit: number, offset: number, filters: any = {}): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    Object.keys(filters).forEach(key => {
      params = params.set(key, filters[key]);
    });

    return this.http.get<any>(this.apiUrl, { params });
  }
}
