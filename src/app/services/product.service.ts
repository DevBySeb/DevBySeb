import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getAllProducts() {
    return of([
      {
        id: 1,
        name: 'Computer',
      },
      {
        id: 2,
        name: 'Mouse',
      },
    ]);
  }
}
