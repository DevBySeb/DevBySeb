import { TestBed } from '@angular/core/testing';

import { StateBaseService } from './state-base.service';

describe('StateBaseService', () => {
  let service: StateBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
