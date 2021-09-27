import { TestBed } from '@angular/core/testing';

import { IsFavedService } from './is-faved.service';

describe('IsFavedService', () => {
  let service: IsFavedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsFavedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
