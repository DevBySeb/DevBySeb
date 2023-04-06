import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getAllUsers() {
    return of([
      {
        id: 1,
        name: 'John',
        email: 'john@smpsol.com',
      },
      {
        id: 2,
        name: 'John',
        email: 'john@smpsol.com',
      },
    ]);
  }
}
