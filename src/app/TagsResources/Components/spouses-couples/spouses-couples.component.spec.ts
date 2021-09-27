import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpousesCouplesComponent } from './spouses-couples.component';

describe('SpousesCouplesComponent', () => {
  let component: SpousesCouplesComponent;
  let fixture: ComponentFixture<SpousesCouplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpousesCouplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpousesCouplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
