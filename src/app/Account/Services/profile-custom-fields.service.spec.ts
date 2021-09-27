import { TestBed } from '@angular/core/testing';

import { ProfileCustomFieldsService } from './profile-custom-fields.service';

describe('ProfileCustomFieldsService', () => {
  let service: ProfileCustomFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileCustomFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
