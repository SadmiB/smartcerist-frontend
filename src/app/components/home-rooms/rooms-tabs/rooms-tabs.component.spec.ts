import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsTabsComponent } from './rooms-tabs.component';

describe('RoomsTabsComponent', () => {
  let component: RoomsTabsComponent;
  let fixture: ComponentFixture<RoomsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
