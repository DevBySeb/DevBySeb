import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() menuOpenedState = new EventEmitter<boolean>();
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    this.menuOpenedState.emit(this.isMenuOpen);
  }

  menuWasOpened(): void {}
}
