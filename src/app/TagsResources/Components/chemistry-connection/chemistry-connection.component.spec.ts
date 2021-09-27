import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistryConnectionComponent } from './chemistry-connection.component';

describe('ChemistryConnectionComponent', () => {
  let component: ChemistryConnectionComponent;
  let fixture: ComponentFixture<ChemistryConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemistryConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemistryConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
