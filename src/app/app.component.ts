import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable, debounceTime, filter, map, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  data$: Observable<any>;
  searchControl = new FormControl('', { nonNullable: true });

  constructor(private dataService: DataService) {
    this.data$ = this.searchControl.valueChanges.pipe(
      filter((value: string) => value.length > 2),
      debounceTime(300),
      switchMap((value: string) => this.dataService.getAll(value)),
      map((breweries) => {
        return breweries.filter(
          (brewery: any) => brewery.brewery_type === 'large'
        );
      })
    );

    // this.data$ = this.dataService.getAll().pipe(
    //   // map((breweries) => {
    //   //   breweries.forEach((brewery: any) => {
    //   //     brewery.address = `${brewery.address_1}, ${brewery.postal_code} ${brewery.state}`;
    //   //   });
    //   //   return breweries;
    //   // })
    //   map((breweries) => {
    //     return breweries.filter(
    //       (brewery: any) => brewery.brewery_type === 'large'
    //     );
    //   })
    // );
  }
}
