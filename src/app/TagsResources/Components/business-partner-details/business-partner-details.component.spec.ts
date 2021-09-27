import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerDetailsComponent } from './business-partner-details.component';

describe('BusinessPartnerDetailsComponent', () => {
  let component: BusinessPartnerDetailsComponent;
  let fixture: ComponentFixture<BusinessPartnerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPartnerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
