import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPwComponent } from './show-pw.component';

describe('ShowPwComponent', () => {
  let component: ShowPwComponent;
  let fixture: ComponentFixture<ShowPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
