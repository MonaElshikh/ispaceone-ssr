import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgReloadComponent } from './svg-reload.component';

describe('SvgReloadComponent', () => {
  let component: SvgReloadComponent;
  let fixture: ComponentFixture<SvgReloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgReloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
