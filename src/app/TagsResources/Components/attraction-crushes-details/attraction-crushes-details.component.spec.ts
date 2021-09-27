import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionCrushesDetailsComponent } from './attraction-crushes-details.component';

describe('AttractionCrushesDetailsComponent', () => {
  let component: AttractionCrushesDetailsComponent;
  let fixture: ComponentFixture<AttractionCrushesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionCrushesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionCrushesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
