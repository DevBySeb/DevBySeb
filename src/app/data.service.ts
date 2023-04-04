import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAll(query = ''): Observable<any> {
    return this.http.get('https://api.openbrewerydb.org/v1/breweries', {
      params: {
        query,
      },
    });
  }
}
