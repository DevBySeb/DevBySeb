import { TestBed } from '@angular/core/testing';

import { MySingletonService } from './my-singleton.service';

describe('MySingletonService', () => {
  let service: MySingletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySingletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
