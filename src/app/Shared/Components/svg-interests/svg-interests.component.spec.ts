import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgInterestsComponent } from './svg-interests.component';

describe('SvgInterestsComponent', () => {
  let component: SvgInterestsComponent;
  let fixture: ComponentFixture<SvgInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
