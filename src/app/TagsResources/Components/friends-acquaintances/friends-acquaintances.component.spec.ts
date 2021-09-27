import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsAcquaintancesComponent } from './friends-acquaintances.component';

describe('FriendsAcquaintancesComponent', () => {
  let component: FriendsAcquaintancesComponent;
  let fixture: ComponentFixture<FriendsAcquaintancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsAcquaintancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsAcquaintancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
