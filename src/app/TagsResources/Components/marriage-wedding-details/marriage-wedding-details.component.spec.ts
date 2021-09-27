import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageWeddingDetailsComponent } from './marriage-wedding-details.component';

describe('MarriageWeddingDetailsComponent', () => {
  let component: MarriageWeddingDetailsComponent;
  let fixture: ComponentFixture<MarriageWeddingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageWeddingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageWeddingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
