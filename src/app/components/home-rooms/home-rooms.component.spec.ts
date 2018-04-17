import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRoomsComponent } from './home-rooms.component';

describe('HomeRoomsComponent', () => {
  let component: HomeRoomsComponent;
  let fixture: ComponentFixture<HomeRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
