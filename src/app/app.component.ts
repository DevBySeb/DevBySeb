import { Component } from '@angular/core';
import { add } from './util.functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';

  constructor() {
    const values = add(2, 3);
    console.log(values);
  }
}
