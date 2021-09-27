import { TestBed } from '@angular/core/testing';

import { OpenRelationshipService } from './open-relationship.service';

describe('OpenRelationshipService', () => {
  let service: OpenRelationshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenRelationshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
