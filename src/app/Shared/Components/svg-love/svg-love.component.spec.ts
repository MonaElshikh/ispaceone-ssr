import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLoveComponent } from './svg-love.component';

describe('SvgLoveComponent', () => {
  let component: SvgLoveComponent;
  let fixture: ComponentFixture<SvgLoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgLoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
