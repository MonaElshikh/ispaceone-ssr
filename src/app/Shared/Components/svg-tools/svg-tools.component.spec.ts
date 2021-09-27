import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgToolsComponent } from './svg-tools.component';

describe('SvgToolsComponent', () => {
  let component: SvgToolsComponent;
  let fixture: ComponentFixture<SvgToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
