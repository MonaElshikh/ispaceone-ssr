import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaysLesbiansDetailsComponent } from './gays-lesbians-details.component';

describe('GaysLesbiansDetailsComponent', () => {
  let component: GaysLesbiansDetailsComponent;
  let fixture: ComponentFixture<GaysLesbiansDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaysLesbiansDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaysLesbiansDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
