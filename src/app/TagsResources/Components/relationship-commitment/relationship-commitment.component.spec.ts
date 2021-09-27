import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipCommitmentComponent } from './relationship-commitment.component';

describe('RelationshipCommitmentComponent', () => {
  let component: RelationshipCommitmentComponent;
  let fixture: ComponentFixture<RelationshipCommitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipCommitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
