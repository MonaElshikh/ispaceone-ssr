import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlirtingSeducingComponent } from './flirting-seducing.component';

describe('FlirtingSeducingComponent', () => {
  let component: FlirtingSeducingComponent;
  let fixture: ComponentFixture<FlirtingSeducingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlirtingSeducingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlirtingSeducingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
