import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallreyViewComponent } from './gallrey-view.component';

describe('GallreyViewComponent', () => {
  let component: GallreyViewComponent;
  let fixture: ComponentFixture<GallreyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallreyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallreyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
