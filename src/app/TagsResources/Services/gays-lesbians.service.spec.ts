import { TestBed } from '@angular/core/testing';

import { GaysLesbiansService } from './gays-lesbians.service';

describe('GaysLesbiansService', () => {
  let service: GaysLesbiansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaysLesbiansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
