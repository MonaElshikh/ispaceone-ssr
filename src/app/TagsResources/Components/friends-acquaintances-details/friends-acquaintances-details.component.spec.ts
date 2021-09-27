import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsAcquaintancesDetailsComponent } from './friends-acquaintances-details.component';

describe('FriendsAcquaintancesDetailsComponent', () => {
  let component: FriendsAcquaintancesDetailsComponent;
  let fixture: ComponentFixture<FriendsAcquaintancesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsAcquaintancesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsAcquaintancesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
