import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPartnerDetailsComponent } from './activity-partner-details.component';

describe('ActivityPartnerDetailsComponent', () => {
  let component: ActivityPartnerDetailsComponent;
  let fixture: ComponentFixture<ActivityPartnerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPartnerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPartnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
