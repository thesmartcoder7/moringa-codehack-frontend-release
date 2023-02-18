import { TestBed } from '@angular/core/testing';

import { AuthenticatedUserService } from './authenticated-user.service';

describe('AuthenticatedUserService', () => {
  let service: AuthenticatedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
