import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  myForm: FormGroup;
  myFormArray: FormArray;
  control = new FormControl('');

  get formArrayControls(): FormGroup[] {
    return this.myFormArray.controls as FormGroup[];
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.createFormGroup();
    this.myFormArray = this.fb.array([this.createFormGroup()]);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit(): void {
    console.log(this.myFormArray.value);
    if (this.myFormArray.invalid) return;
  }

  addFormItem(): void {
    this.myFormArray.push(this.createFormGroup());
  }

  removeFormItem(index: number): void {
    this.myFormArray.removeAt(index);
  }
}
