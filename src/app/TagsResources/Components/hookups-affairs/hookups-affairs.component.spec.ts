import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookupsAffairsComponent } from './hookups-affairs.component';

describe('HookupsAffairsComponent', () => {
  let component: HookupsAffairsComponent;
  let fixture: ComponentFixture<HookupsAffairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookupsAffairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookupsAffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
