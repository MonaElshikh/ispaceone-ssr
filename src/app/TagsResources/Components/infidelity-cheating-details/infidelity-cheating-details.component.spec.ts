import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfidelityCheatingDetailsComponent } from './infidelity-cheating-details.component';

describe('InfidelityCheatingDetailsComponent', () => {
  let component: InfidelityCheatingDetailsComponent;
  let fixture: ComponentFixture<InfidelityCheatingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfidelityCheatingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfidelityCheatingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
