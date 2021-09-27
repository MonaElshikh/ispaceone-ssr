import { TestBed } from '@angular/core/testing';

import { CareerOpportunitiesService } from './career-opportunities.service';

describe('CareerOpportunitiesService', () => {
  let service: CareerOpportunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerOpportunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
