import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesSayingsAuthorDetailsComponent } from './quotes-sayings-author-details.component';

describe('QuotesSayingsAuthorDetailsComponent', () => {
  let component: QuotesSayingsAuthorDetailsComponent;
  let fixture: ComponentFixture<QuotesSayingsAuthorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotesSayingsAuthorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesSayingsAuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
