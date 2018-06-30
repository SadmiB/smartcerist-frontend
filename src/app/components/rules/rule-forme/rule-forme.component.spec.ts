import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleFormeComponent } from './rule-forme.component';

describe('RuleFormeComponent', () => {
  let component: RuleFormeComponent;
  let fixture: ComponentFixture<RuleFormeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleFormeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
