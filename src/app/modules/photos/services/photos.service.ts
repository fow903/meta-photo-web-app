import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private readonly apiUrl = 'http://localhost:3000/externalapi/photos';

  constructor(private http: HttpClient) {}

  getPhotos(limit: number, offset: number, filters: any = {}): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    // Append filters to the params if provided
    Object.keys(filters).forEach(key => {
      params = params.set(key, filters[key]);
    });

    return this.http.get<any>(this.apiUrl, { params });
  }
}
