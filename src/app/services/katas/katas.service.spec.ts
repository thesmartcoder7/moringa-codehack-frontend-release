import { TestBed } from '@angular/core/testing';

import { KatasService } from './katas.service';

describe('KatasService', () => {
  let service: KatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
