import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDiagComponent } from './warning-diag.component';

describe('WarningDiagComponent', () => {
  let component: WarningDiagComponent;
  let fixture: ComponentFixture<WarningDiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningDiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
