import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagesresourcesDetailsComponent } from './tagesresources-details.component';

describe('TagesresourcesDetailsComponent', () => {
  let component: TagesresourcesDetailsComponent;
  let fixture: ComponentFixture<TagesresourcesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagesresourcesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagesresourcesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
