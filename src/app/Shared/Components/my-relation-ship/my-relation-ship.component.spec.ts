import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRelationShipComponent } from './my-relation-ship.component';

describe('MyRelationShipComponent', () => {
  let component: MyRelationShipComponent;
  let fixture: ComponentFixture<MyRelationShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRelationShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRelationShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
