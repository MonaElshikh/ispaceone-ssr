import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgReadComponent } from './svg-read.component';

describe('SvgReadComponent', () => {
  let component: SvgReadComponent;
  let fixture: ComponentFixture<SvgReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
