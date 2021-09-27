import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeStyleDetailsComponent } from './life-style-details.component';

describe('LifeStyleDetailsComponent', () => {
  let component: LifeStyleDetailsComponent;
  let fixture: ComponentFixture<LifeStyleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeStyleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeStyleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
