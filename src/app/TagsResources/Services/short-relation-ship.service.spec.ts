import { TestBed } from '@angular/core/testing';

import { ShortRelationShipService } from './short-relation-ship.service';

describe('ShortRelationShipService', () => {
  let service: ShortRelationShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortRelationShipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
