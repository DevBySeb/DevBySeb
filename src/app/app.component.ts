import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  errorMessages = { required: 'The name field is required' };
  testControl = new FormControl('MyDefaultValue', Validators.required);

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
  });
}
