import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagesresourcesListComponent } from './tagesresources-list.component';

describe('TagesresourcesListComponent', () => {
  let component: TagesresourcesListComponent;
  let fixture: ComponentFixture<TagesresourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagesresourcesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagesresourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
