import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingCourtshipDetailsComponent } from './dating-courtship-details.component';

describe('DatingCourtshipDetailsComponent', () => {
  let component: DatingCourtshipDetailsComponent;
  let fixture: ComponentFixture<DatingCourtshipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatingCourtshipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingCourtshipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
