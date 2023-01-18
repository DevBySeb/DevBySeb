import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBrewery } from '../interfaces/brewery.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IBrewery> {
    return this.http.get<IBrewery>(`https://api.openbrewerydb.org/breweries`);
  }
}
