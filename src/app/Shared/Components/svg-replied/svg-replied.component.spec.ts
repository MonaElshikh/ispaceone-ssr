import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgRepliedComponent } from './svg-replied.component';

describe('SvgRepliedComponent', () => {
  let component: SvgRepliedComponent;
  let fixture: ComponentFixture<SvgRepliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgRepliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgRepliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
