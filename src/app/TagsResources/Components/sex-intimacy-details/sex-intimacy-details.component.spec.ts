import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexIntimacyDetailsComponent } from './sex-intimacy-details.component';

describe('SexIntimacyDetailsComponent', () => {
  let component: SexIntimacyDetailsComponent;
  let fixture: ComponentFixture<SexIntimacyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexIntimacyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexIntimacyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
