import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgStarComponent } from './svg-star.component';

describe('SvgStarComponent', () => {
  let component: SvgStarComponent;
  let fixture: ComponentFixture<SvgStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgStarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
