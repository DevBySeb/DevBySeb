import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { BehaviorSubject, forkJoin, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private usersBS$ = new BehaviorSubject<any[]>([]);
  private productsBS$ = new BehaviorSubject<any[]>([]);
  users$ = this.usersBS$.asObservable();
  products$ = this.productsBS$.asObservable();

  users: any[] = [];
  products: any[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  getUsersAndProducts() {
    return forkJoin([
      this.userService.getAllUsers(),
      this.productService.getAllProducts(),
    ])
      .pipe(take(1))
      .subscribe(([users, products]: any) => {
        this.usersBS$.next(users);
        this.productsBS$.next(products);
        this.users = users;
        this.products = products;
      });
  }
}
