import { TestBed } from '@angular/core/testing';

import { SexIntimacyService } from './sex-intimacy.service';

describe('SexIntimacyService', () => {
  let service: SexIntimacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SexIntimacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
