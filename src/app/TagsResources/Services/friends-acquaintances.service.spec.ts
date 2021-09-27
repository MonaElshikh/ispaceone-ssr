import { TestBed } from '@angular/core/testing';

import { FriendsAcquaintancesService } from './friends-acquaintances.service';

describe('FriendsAcquaintancesService', () => {
  let service: FriendsAcquaintancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsAcquaintancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
