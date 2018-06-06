import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesDisplayComponent } from './homes-display.component';

describe('HomesDisplayComponent', () => {
  let component: HomesDisplayComponent;
  let fixture: ComponentFixture<HomesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
