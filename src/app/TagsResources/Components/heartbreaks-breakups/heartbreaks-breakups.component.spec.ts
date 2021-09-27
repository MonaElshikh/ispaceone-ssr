import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbreaksBreakupsComponent } from './heartbreaks-breakups.component';

describe('HeartbreaksBreakupsComponent', () => {
  let component: HeartbreaksBreakupsComponent;
  let fixture: ComponentFixture<HeartbreaksBreakupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartbreaksBreakupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbreaksBreakupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
