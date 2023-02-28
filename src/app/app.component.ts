import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userGroup = new FormGroup({
    id: new FormControl(-1, { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
  });

  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService
      .getAll()
      .pipe(take(1))
      .subscribe((users) => (this.users = users));
  }

  createOrUpdateUser(): void {
    this.userGroup.value.id === -1 ? this.createUser() : this.updateUser();
  }

  createUser(): void {
    this.userService
      .create(this.userGroup.value as User)
      .pipe(take(1))
      .subscribe((createdUser) => {
        this.users.push(createdUser);
        this.userGroup.reset();
      });
  }

  updateUser(): void {
    this.userService
      .update(this.userGroup.value as User)
      .pipe(take(1))
      .subscribe((updatedUser) => {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        this.users[index] = updatedUser;
        this.userGroup.reset();
      });
  }

  triggerEdit(index: number): void {
    this.userGroup.patchValue(this.users[index]);
  }

  deleteUser(index: number): void {
    this.userService
      .delete(this.users[index].id as number)
      .pipe(take(1))
      .subscribe(() => {
        this.users = this.users.filter((u) => u.id !== this.users[index].id);
      });
  }
}
