import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonyCompatibilityDetailsComponent } from './harmony-compatibility-details.component';

describe('HarmonyCompatibilityDetailsComponent', () => {
  let component: HarmonyCompatibilityDetailsComponent;
  let fixture: ComponentFixture<HarmonyCompatibilityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarmonyCompatibilityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarmonyCompatibilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
