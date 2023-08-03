import { TestBed } from '@angular/core/testing';

import { StateFacadeService } from './state-facade.service';

describe('StateFacadeService', () => {
  let service: StateFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
