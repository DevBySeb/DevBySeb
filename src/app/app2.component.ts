import { Component, inject } from '@angular/core';
import { DataService } from './services/data.service';
import { Perform } from './perform.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly dataService = inject(DataService);
  perform = new Perform(this.dataService.getData());
}
