import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpousesCouplesDetailsComponent } from './spouses-couples-details.component';

describe('SpousesCouplesDetailsComponent', () => {
  let component: SpousesCouplesDetailsComponent;
  let fixture: ComponentFixture<SpousesCouplesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpousesCouplesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpousesCouplesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
