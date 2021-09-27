import { TestBed } from '@angular/core/testing';

import { ProfilesILikedService } from './profiles-iliked.service';

describe('ProfilesILikedService', () => {
  let service: ProfilesILikedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesILikedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
