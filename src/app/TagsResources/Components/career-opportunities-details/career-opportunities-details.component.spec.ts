import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerOpportunitiesDetailsComponent } from './career-opportunities-details.component';

describe('CareerOpportunitiesDetailsComponent', () => {
  let component: CareerOpportunitiesDetailsComponent;
  let fixture: ComponentFixture<CareerOpportunitiesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerOpportunitiesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerOpportunitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
