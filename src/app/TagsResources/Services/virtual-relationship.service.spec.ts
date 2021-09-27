import { TestBed } from '@angular/core/testing';

import { VirtualRelationshipService } from './virtual-relationship.service';

describe('VirtualRelationshipService', () => {
  let service: VirtualRelationshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualRelationshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
