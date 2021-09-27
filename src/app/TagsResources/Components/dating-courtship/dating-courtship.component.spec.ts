import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingCourtshipComponent } from './dating-courtship.component';

describe('DatingCourtshipComponent', () => {
  let component: DatingCourtshipComponent;
  let fixture: ComponentFixture<DatingCourtshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatingCourtshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingCourtshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
