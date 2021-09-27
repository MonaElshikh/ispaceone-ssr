import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongRelationShipDetailsComponent } from './long-relation-ship-details.component';

describe('LongRelationShipDetailsComponent', () => {
  let component: LongRelationShipDetailsComponent;
  let fixture: ComponentFixture<LongRelationShipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongRelationShipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongRelationShipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
