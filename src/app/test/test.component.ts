import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  data: any[] = [];
  private destroy$ = destroy();

  constructor(private dataService: DataService) {
    this.dataService
      .getAll()
      .pipe(this.destroy$())
      .subscribe((data: any) => (this.data = data));
  }
}

export function destroy() {
  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    subject.next(true);
    subject.complete();
  });

  return () => takeUntil(subject.asObservable());
}
