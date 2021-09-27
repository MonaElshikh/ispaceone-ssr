import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustFriendsComponent } from './just-friends.component';

describe('JustFriendsComponent', () => {
  let component: JustFriendsComponent;
  let fixture: ComponentFixture<JustFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
