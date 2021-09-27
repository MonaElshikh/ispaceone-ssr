import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HidePwComponent } from './hide-pw.component';

describe('HidePwComponent', () => {
  let component: HidePwComponent;
  let fixture: ComponentFixture<HidePwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HidePwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HidePwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
