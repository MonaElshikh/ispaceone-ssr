import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongRelationShipComponent } from './long-relation-ship.component';

describe('LongRelationShipComponent', () => {
  let component: LongRelationShipComponent;
  let fixture: ComponentFixture<LongRelationShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongRelationShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongRelationShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
