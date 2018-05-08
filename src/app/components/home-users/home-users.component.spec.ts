import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUsersComponent } from './home-users.component';

describe('HomeUsersComponent', () => {
  let component: HomeUsersComponent;
  let fixture: ComponentFixture<HomeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
