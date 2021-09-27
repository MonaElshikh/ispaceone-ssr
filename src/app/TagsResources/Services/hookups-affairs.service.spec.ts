import { TestBed } from '@angular/core/testing';

import { HookupsAffairsService } from './hookups-affairs.service';

describe('HookupsAffairsService', () => {
  let service: HookupsAffairsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HookupsAffairsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
