import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaysLesbiansComponent } from './gays-lesbians.component';

describe('GaysLesbiansComponent', () => {
  let component: GaysLesbiansComponent;
  let fixture: ComponentFixture<GaysLesbiansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaysLesbiansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaysLesbiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
