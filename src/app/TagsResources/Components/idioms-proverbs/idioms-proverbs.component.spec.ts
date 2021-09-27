import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomsProverbsComponent } from './idioms-proverbs.component';

describe('IdiomsProverbsComponent', () => {
  let component: IdiomsProverbsComponent;
  let fixture: ComponentFixture<IdiomsProverbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdiomsProverbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomsProverbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
