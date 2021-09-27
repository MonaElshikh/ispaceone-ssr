import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbreviationsAcronymsComponent } from './abbreviations-acronyms.component';

describe('AbbreviationsAcronymsComponent', () => {
  let component: AbbreviationsAcronymsComponent;
  let fixture: ComponentFixture<AbbreviationsAcronymsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbbreviationsAcronymsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbbreviationsAcronymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
