import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getData(): Observable<Data[]> {
    return of([
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]);
  }
}
