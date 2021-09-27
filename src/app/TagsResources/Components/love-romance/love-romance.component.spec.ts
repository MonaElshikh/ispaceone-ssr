import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveRomanceComponent } from './love-romance.component';

describe('LoveRomanceComponent', () => {
  let component: LoveRomanceComponent;
  let fixture: ComponentFixture<LoveRomanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoveRomanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoveRomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
