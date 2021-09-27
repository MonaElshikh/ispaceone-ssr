import { TestBed } from '@angular/core/testing';

import { CanDeactivateGuardService } from 'Shared/Services/can-deactivate-guard.service';

describe('CanDeactivateGuardService', () => {
  let service: CanDeactivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDeactivateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
