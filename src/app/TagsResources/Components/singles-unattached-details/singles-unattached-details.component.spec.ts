import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesUnattachedDetailsComponent } from './singles-unattached-details.component';

describe('SinglesUnattachedDetailsComponent', () => {
  let component: SinglesUnattachedDetailsComponent;
  let fixture: ComponentFixture<SinglesUnattachedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglesUnattachedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglesUnattachedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
