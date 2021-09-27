import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRelationshipDetailsComponent } from './virtual-relationship-details.component';

describe('VirtualRelationshipDetailsComponent', () => {
  let component: VirtualRelationshipDetailsComponent;
  let fixture: ComponentFixture<VirtualRelationshipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualRelationshipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualRelationshipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
