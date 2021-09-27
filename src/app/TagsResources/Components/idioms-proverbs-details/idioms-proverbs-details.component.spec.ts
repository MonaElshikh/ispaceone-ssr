import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomsProverbsDetailsComponent } from './idioms-proverbs-details.component';

describe('IdiomsProverbsDetailsComponent', () => {
  let component: IdiomsProverbsDetailsComponent;
  let fixture: ComponentFixture<IdiomsProverbsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdiomsProverbsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomsProverbsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
