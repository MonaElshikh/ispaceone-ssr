import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLeftMenuComponent } from './footer-left-menu.component';

describe('FooterLeftMenuComponent', () => {
  let component: FooterLeftMenuComponent;
  let fixture: ComponentFixture<FooterLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
