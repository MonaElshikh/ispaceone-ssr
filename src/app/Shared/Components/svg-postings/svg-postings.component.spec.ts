import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPostingsComponent } from './svg-postings.component';

describe('SvgPostingsComponent', () => {
  let component: SvgPostingsComponent;
  let fixture: ComponentFixture<SvgPostingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgPostingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
