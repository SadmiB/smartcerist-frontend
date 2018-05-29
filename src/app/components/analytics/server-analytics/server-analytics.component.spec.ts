import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerAnalyticsComponent } from './server-analytics.component';

describe('ServerAnalyticsComponent', () => {
  let component: ServerAnalyticsComponent;
  let fixture: ComponentFixture<ServerAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
