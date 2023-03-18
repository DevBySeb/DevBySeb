import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { InputModule } from '@ui/input/input.module';

@NgModule({
  declarations: [],
  imports: [InputModule, CommonModule, AccountRoutingModule],
})
export class AccountModule {}
