import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbreaksBreakupsDetailsComponent } from './heartbreaks-breakups-details.component';

describe('HeartbreaksBreakupsDetailsComponent', () => {
  let component: HeartbreaksBreakupsDetailsComponent;
  let fixture: ComponentFixture<HeartbreaksBreakupsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartbreaksBreakupsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbreaksBreakupsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
