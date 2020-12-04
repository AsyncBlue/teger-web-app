import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPassComponent } from './alert-pass.component';

describe('AlertPassComponent', () => {
  let component: AlertPassComponent;
  let fixture: ComponentFixture<AlertPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
