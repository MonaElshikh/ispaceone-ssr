import { TestBed } from '@angular/core/testing';

import { HarmonyCompatibilityService } from './harmony-compatibility.service';

describe('HarmonyCompatibilityService', () => {
  let service: HarmonyCompatibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarmonyCompatibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
