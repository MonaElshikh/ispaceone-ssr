import { TestBed } from '@angular/core/testing';

import { ProfilesFavoritedService } from './profiles-favorited.service';

describe('ProfilesFavoritedService', () => {
  let service: ProfilesFavoritedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesFavoritedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
