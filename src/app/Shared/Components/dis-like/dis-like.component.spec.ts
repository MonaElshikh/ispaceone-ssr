import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisLikeComponent } from './dis-like.component';

describe('DisLikeComponent', () => {
  let component: DisLikeComponent;
  let fixture: ComponentFixture<DisLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
