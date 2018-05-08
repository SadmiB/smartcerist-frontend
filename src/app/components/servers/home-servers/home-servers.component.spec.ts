import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeServersComponent } from './home-servers.component';

describe('HomeServersComponent', () => {
  let component: HomeServersComponent;
  let fixture: ComponentFixture<HomeServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
