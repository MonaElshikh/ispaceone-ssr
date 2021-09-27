import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgHomeComponent } from './svg-home.component';

describe('SvgHomeComponent', () => {
  let component: SvgHomeComponent;
  let fixture: ComponentFixture<SvgHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
