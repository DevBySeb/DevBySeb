import { Component } from '@angular/core';
import { CanDeactivateComponent } from 'src/app/guards/unsavedchanges.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends CanDeactivateComponent {
  isFormChanged = true;

  public canDeactivate(): boolean {
    return !this.isFormChanged;
  }
}
