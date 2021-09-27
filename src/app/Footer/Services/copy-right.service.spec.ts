import { TestBed } from '@angular/core/testing';

import { CopyRightService } from './copy-right.service';

describe('CopyRightService', () => {
  let service: CopyRightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyRightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
