import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookupsAffairsDetailsComponent } from './hookups-affairs-details.component';

describe('HookupsAffairsDetailsComponent', () => {
  let component: HookupsAffairsDetailsComponent;
  let fixture: ComponentFixture<HookupsAffairsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookupsAffairsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookupsAffairsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
