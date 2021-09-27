import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagesresoursesLeftmenuComponent } from './tagesresourses-leftmenu.component';

describe('TagesresoursesLeftmenuComponent', () => {
  let component: TagesresoursesLeftmenuComponent;
  let fixture: ComponentFixture<TagesresoursesLeftmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagesresoursesLeftmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagesresoursesLeftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
