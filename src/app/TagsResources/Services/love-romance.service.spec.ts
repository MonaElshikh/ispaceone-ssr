import { TestBed } from '@angular/core/testing';

import { LoveRomanceService } from './love-romance.service';

describe('LoveRomanceService', () => {
  let service: LoveRomanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoveRomanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
