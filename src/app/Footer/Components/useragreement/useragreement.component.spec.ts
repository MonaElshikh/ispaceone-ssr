import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseragreementComponent } from './useragreement.component';

describe('UseragreementComponent', () => {
  let component: UseragreementComponent;
  let fixture: ComponentFixture<UseragreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseragreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseragreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
