import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgUnreadComponent } from './svg-unread.component';

describe('SvgUnreadComponent', () => {
  let component: SvgUnreadComponent;
  let fixture: ComponentFixture<SvgUnreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgUnreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgUnreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
