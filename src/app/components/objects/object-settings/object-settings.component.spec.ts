import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSettingsComponent } from './object-settings.component';

describe('ObjectSettingsComponent', () => {
  let component: ObjectSettingsComponent;
  let fixture: ComponentFixture<ObjectSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
