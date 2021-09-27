import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieuseComponent } from './cookieuse.component';

describe('CookieuseComponent', () => {
  let component: CookieuseComponent;
  let fixture: ComponentFixture<CookieuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
