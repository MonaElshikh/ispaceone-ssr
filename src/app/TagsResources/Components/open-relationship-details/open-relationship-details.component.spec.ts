import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRelationshipDetailsComponent } from './open-relationship-details.component';

describe('OpenRelationshipDetailsComponent', () => {
  let component: OpenRelationshipDetailsComponent;
  let fixture: ComponentFixture<OpenRelationshipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRelationshipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRelationshipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
