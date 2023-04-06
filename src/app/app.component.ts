import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { FacadeService } from './services/facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  products$: Observable<any>;
  users$: Observable<any>;

  get products() {
    return this.facadeService.products;
  }

  get users() {
    return this.facadeService.users;
  }

  constructor(private facadeService: FacadeService) {
    this.products$ = this.facadeService.products$;
    this.users$ = this.facadeService.users$;
    this.facadeService.getUsersAndProducts();
  }
}
