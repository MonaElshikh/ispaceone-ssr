import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologyHoroscopeDetailsComponent } from './astrology-horoscope-details.component';

describe('AstrologyHoroscopeDetailsComponent', () => {
  let component: AstrologyHoroscopeDetailsComponent;
  let fixture: ComponentFixture<AstrologyHoroscopeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrologyHoroscopeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrologyHoroscopeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
