import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageWeddingComponent } from './marriage-wedding.component';

describe('MarriageWeddingComponent', () => {
  let component: MarriageWeddingComponent;
  let fixture: ComponentFixture<MarriageWeddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageWeddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
