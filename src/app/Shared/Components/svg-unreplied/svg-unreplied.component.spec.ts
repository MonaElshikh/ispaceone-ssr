import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgUnrepliedComponent } from './svg-unreplied.component';

describe('SvgUnrepliedComponent', () => {
  let component: SvgUnrepliedComponent;
  let fixture: ComponentFixture<SvgUnrepliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgUnrepliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgUnrepliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
