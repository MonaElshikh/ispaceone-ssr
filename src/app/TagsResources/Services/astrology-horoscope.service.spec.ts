import { TestBed } from '@angular/core/testing';

import { AstrologyHoroscopeService } from './astrology-horoscope.service';

describe('AstrologyHoroscopeService', () => {
  let service: AstrologyHoroscopeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstrologyHoroscopeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
