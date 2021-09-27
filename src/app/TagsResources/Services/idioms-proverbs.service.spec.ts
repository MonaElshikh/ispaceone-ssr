import { TestBed } from '@angular/core/testing';

import { IdiomsProverbsService } from './idioms-proverbs.service';

describe('IdiomsProverbsService', () => {
  let service: IdiomsProverbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdiomsProverbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
