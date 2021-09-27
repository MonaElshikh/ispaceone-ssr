import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMoreComponent } from './svg-more.component';

describe('SvgMoreComponent', () => {
  let component: SvgMoreComponent;
  let fixture: ComponentFixture<SvgMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
