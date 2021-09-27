import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasExtrasDetailsComponent } from './extras-extras-details.component';

describe('ExtrasExtrasDetailsComponent', () => {
  let component: ExtrasExtrasDetailsComponent;
  let fixture: ComponentFixture<ExtrasExtrasDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrasExtrasDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrasExtrasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
