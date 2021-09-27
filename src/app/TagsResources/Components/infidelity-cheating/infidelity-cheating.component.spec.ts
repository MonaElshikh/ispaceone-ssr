import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfidelityCheatingComponent } from './infidelity-cheating.component';

describe('InfidelityCheatingComponent', () => {
  let component: InfidelityCheatingComponent;
  let fixture: ComponentFixture<InfidelityCheatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfidelityCheatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfidelityCheatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
