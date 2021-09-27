import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologyHoroscopeComponent } from './astrology-horoscope.component';

describe('AstrologyHoroscopeComponent', () => {
  let component: AstrologyHoroscopeComponent;
  let fixture: ComponentFixture<AstrologyHoroscopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrologyHoroscopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrologyHoroscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
