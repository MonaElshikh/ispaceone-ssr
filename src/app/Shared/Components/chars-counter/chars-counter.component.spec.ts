import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsCounterComponent } from './chars-counter.component';

describe('CharsCounterComponent', () => {
  let component: CharsCounterComponent;
  let fixture: ComponentFixture<CharsCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharsCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
