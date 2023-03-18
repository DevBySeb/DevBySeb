import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  color = '';

  changeColor() {
    console.time('changeColor');
    const button = document.querySelector('button');
    button!.style.backgroundColor = 'red';
    console.timeEnd('changeColor');
  }

  changeColorTheRightWay() {
    console.time('changeColorTheRightWay');
    this.color = 'red';
    console.timeEnd('changeColorTheRightWay');
  }
}
