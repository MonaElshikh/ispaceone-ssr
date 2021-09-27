import { TestBed } from '@angular/core/testing';

import { SpousesCouplesService } from './spouses-couples.service';

describe('SpousesCouplesService', () => {
  let service: SpousesCouplesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpousesCouplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
