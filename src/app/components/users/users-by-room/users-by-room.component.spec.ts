import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersByRoomComponent } from './users-by-room.component';

describe('UsersByRoomComponent', () => {
  let component: UsersByRoomComponent;
  let fixture: ComponentFixture<UsersByRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersByRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersByRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
