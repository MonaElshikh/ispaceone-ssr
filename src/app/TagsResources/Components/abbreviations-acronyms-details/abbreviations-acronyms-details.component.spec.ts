import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbreviationsAcronymsDetailsComponent } from './abbreviations-acronyms-details.component';

describe('AbbreviationsAcronymsDetailsComponent', () => {
  let component: AbbreviationsAcronymsDetailsComponent;
  let fixture: ComponentFixture<AbbreviationsAcronymsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbbreviationsAcronymsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbbreviationsAcronymsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
