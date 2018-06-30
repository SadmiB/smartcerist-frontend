import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConditionComponent } from './add-condition.component';

describe('AddConditionComponent', () => {
  let component: AddConditionComponent;
  let fixture: ComponentFixture<AddConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
