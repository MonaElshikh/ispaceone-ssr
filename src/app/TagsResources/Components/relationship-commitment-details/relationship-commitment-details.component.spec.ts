import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipCommitmentDetailsComponent } from './relationship-commitment-details.component';

describe('RelationshipCommitmentDetailsComponent', () => {
  let component: RelationshipCommitmentDetailsComponent;
  let fixture: ComponentFixture<RelationshipCommitmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipCommitmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipCommitmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
