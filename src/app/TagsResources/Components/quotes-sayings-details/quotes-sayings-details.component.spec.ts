import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesSayingsDetailsComponent } from './quotes-sayings-details.component';

describe('QuotesSayingsDetailsComponent', () => {
  let component: QuotesSayingsDetailsComponent;
  let fixture: ComponentFixture<QuotesSayingsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesSayingsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesSayingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
