import { TestBed } from '@angular/core/testing';

import { ProfileViewersService } from './profile-viewers.service';

describe('ProfileViewersService', () => {
  let service: ProfileViewersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileViewersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
