import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexIntimacyComponent } from './sex-intimacy.component';

describe('SexIntimacyComponent', () => {
  let component: SexIntimacyComponent;
  let fixture: ComponentFixture<SexIntimacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexIntimacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexIntimacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
