import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label = '';
  @Input() inputId = Math.random().toString(24);
  @Input() type: InputType = 'text';
  @Input() helpText = '';
  @Input() placeholder = '';
  @Input() control = new FormControl();

  get ariaDescribedBy() {
    const describedByItems = [];
    this.helpText && describedByItems.push(`${this.inputId + '-help'}`);
    this.control.errors && describedByItems.push(`${this.inputId + '-error'}`);
    return describedByItems.length > 0 ? describedByItems.join(' ') : undefined;
  }
}
