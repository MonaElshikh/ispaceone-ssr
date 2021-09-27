import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortRelationShipDetailsComponent } from './short-relation-ship-details.component';

describe('ShortRelationShipDetailsComponent', () => {
  let component: ShortRelationShipDetailsComponent;
  let fixture: ComponentFixture<ShortRelationShipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortRelationShipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortRelationShipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
