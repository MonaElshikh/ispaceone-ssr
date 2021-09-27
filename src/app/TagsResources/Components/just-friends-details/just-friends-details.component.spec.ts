import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustFriendsDetailsComponent } from './just-friends-details.component';

describe('JustFriendsDetailsComponent', () => {
  let component: JustFriendsDetailsComponent;
  let fixture: ComponentFixture<JustFriendsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustFriendsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustFriendsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
