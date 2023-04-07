import { Component } from '@angular/core';
import { MySingletonService } from './my-singleton.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';

  get latestData(): string {
    return this.mySingletonService.latestData;
  }

  constructor(private mySingletonService: MySingletonService) {
    this.mySingletonService.latestData = 'Hello world';
  }
}
