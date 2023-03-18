import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [CommonModule],
})
export class InputModule {}
