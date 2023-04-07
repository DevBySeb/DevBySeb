import { Component } from '@angular/core';
import { MySingletonService } from '../my-singleton.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;

  get latestData(): string {
    return this.mySingletonService.latestData;
  }

  constructor(private mySingletonService: MySingletonService) {
    setTimeout(() => {
      this.mySingletonService.latestData = 'World Hello';
    }, 5000);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
