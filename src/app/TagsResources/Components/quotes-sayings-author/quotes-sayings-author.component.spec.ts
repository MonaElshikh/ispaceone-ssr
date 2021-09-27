import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesSayingsAuthorComponent } from './quotes-sayings-author.component';

describe('QuotesSayingsAuthorComponent', () => {
  let component: QuotesSayingsAuthorComponent;
  let fixture: ComponentFixture<QuotesSayingsAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotesSayingsAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesSayingsAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
