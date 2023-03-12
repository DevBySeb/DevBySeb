import { TestBed } from '@angular/core/testing';

import { UnsavedchangesGuard } from './unsavedchanges.guard';

describe('UnsavedchangesGuard', () => {
  let guard: UnsavedchangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavedchangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
