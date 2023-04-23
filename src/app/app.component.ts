import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';

  callMyFunction() {
    alert('Hello World');
  }

  onKeyUp($event: Event) {
    alert($event);
  }

  menuWasOpened(isOpened: boolean): void {
    alert(isOpened);
  }
}
