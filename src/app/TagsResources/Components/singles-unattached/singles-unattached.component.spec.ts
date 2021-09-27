import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesUnattachedComponent } from './singles-unattached.component';

describe('SinglesUnattachedComponent', () => {
  let component: SinglesUnattachedComponent;
  let fixture: ComponentFixture<SinglesUnattachedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglesUnattachedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglesUnattachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
