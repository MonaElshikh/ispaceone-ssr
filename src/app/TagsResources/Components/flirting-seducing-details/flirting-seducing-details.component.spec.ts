import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlirtingSeducingDetailsComponent } from './flirting-seducing-details.component';

describe('FlirtingSeducingDetailsComponent', () => {
  let component: FlirtingSeducingDetailsComponent;
  let fixture: ComponentFixture<FlirtingSeducingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlirtingSeducingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlirtingSeducingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
