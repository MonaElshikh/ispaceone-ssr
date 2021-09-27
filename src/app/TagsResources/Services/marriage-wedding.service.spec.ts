import { TestBed } from '@angular/core/testing';

import { MarriageWeddingService } from './marriage-wedding.service';

describe('MarriageWeddingService', () => {
  let service: MarriageWeddingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarriageWeddingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
