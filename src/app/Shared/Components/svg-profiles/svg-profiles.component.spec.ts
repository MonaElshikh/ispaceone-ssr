import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgProfilesComponent } from './svg-profiles.component';

describe('SvgProfilesComponent', () => {
  let component: SvgProfilesComponent;
  let fixture: ComponentFixture<SvgProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
