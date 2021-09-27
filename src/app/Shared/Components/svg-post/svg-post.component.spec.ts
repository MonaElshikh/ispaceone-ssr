import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPostComponent } from './svg-post.component';

describe('SvgPostComponent', () => {
  let component: SvgPostComponent;
  let fixture: ComponentFixture<SvgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
