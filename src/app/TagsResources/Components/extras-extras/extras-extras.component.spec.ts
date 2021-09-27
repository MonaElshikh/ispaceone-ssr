import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasExtrasComponent } from './extras-extras.component';

describe('ExtrasExtrasComponent', () => {
  let component: ExtrasExtrasComponent;
  let fixture: ComponentFixture<ExtrasExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrasExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
