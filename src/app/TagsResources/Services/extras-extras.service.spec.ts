import { TestBed } from '@angular/core/testing';

import { ExtrasExtrasService } from './extras-extras.service';

describe('ExtrasExtrasService', () => {
  let service: ExtrasExtrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtrasExtrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
