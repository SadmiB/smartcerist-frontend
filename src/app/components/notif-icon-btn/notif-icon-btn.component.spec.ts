import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifIconBtnComponent } from './notif-icon-btn.component';

describe('NotifIconBtnComponent', () => {
  let component: NotifIconBtnComponent;
  let fixture: ComponentFixture<NotifIconBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifIconBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifIconBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
