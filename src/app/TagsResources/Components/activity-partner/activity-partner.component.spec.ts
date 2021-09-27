import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPartnerComponent } from './activity-partner.component';

describe('ActivityPartnerComponent', () => {
  let component: ActivityPartnerComponent;
  let fixture: ComponentFixture<ActivityPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
