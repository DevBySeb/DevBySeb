import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {
  constructor() {
    console.log('Loaded account module');
  }
}
