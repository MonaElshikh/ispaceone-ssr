import { TestBed } from '@angular/core/testing';

import { LongRelationShipService } from './long-relation-ship.service';

describe('LongRelationShipService', () => {
  let service: LongRelationShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongRelationShipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
