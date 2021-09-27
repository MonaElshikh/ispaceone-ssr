import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRelationshipComponent } from './virtual-relationship.component';

describe('VirtualRelationshipComponent', () => {
  let component: VirtualRelationshipComponent;
  let fixture: ComponentFixture<VirtualRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
