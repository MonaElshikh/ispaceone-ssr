import { TestBed } from '@angular/core/testing';

import { RelationshipCommitmentService } from './relationship-commitment.service';

describe('RelationshipCommitmentService', () => {
  let service: RelationshipCommitmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationshipCommitmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
