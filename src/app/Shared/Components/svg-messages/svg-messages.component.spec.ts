import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMessagesComponent } from './svg-messages.component';

describe('SvgMessagesComponent', () => {
  let component: SvgMessagesComponent;
  let fixture: ComponentFixture<SvgMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
