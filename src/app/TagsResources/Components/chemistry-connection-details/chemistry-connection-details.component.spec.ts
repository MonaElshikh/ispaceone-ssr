import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistryConnectionDetailsComponent } from './chemistry-connection-details.component';

describe('ChemistryConnectionDetailsComponent', () => {
  let component: ChemistryConnectionDetailsComponent;
  let fixture: ComponentFixture<ChemistryConnectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemistryConnectionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemistryConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
