import { TestBed } from '@angular/core/testing';

import { ProfileViewsService } from './profile-views.service';

describe('ProfileViewsService', () => {
  let service: ProfileViewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
