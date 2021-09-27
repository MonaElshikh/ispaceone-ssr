import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBoxesComponent } from './stats-boxes.component';

describe('StatsBoxesComponent', () => {
  let component: StatsBoxesComponent;
  let fixture: ComponentFixture<StatsBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
