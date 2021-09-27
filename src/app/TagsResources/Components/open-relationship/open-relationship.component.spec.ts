import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRelationshipComponent } from './open-relationship.component';

describe('OpenRelationshipComponent', () => {
  let component: OpenRelationshipComponent;
  let fixture: ComponentFixture<OpenRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
