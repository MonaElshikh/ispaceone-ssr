import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesSayingsComponent } from './quotes-sayings.component';

describe('QuotesSayingsComponent', () => {
  let component: QuotesSayingsComponent;
  let fixture: ComponentFixture<QuotesSayingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesSayingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesSayingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
