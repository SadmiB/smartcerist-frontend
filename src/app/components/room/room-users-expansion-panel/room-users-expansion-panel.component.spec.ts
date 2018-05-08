import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUsersExpansionPanelComponent } from './room-users-expansion-panel.component';

describe('RoomUsersExpansionPanelComponent', () => {
  let component: RoomUsersExpansionPanelComponent;
  let fixture: ComponentFixture<RoomUsersExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomUsersExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUsersExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
