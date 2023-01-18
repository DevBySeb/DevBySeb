import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Perform } from './classes/perform.class';
import { IBrewery } from './interfaces/brewery.interface';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  data = new Perform<IBrewery>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data.load(this.dataService.getAll());
  }
}
