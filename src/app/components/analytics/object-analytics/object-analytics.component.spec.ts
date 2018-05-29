import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectAnalyticsComponent } from './object-analytics.component';

describe('ObjectAnalyticsComponent', () => {
  let component: ObjectAnalyticsComponent;
  let fixture: ComponentFixture<ObjectAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
