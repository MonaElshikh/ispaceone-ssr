import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionCrushesComponent } from './attraction-crushes.component';

describe('AttractionCrushesComponent', () => {
  let component: AttractionCrushesComponent;
  let fixture: ComponentFixture<AttractionCrushesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionCrushesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionCrushesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
