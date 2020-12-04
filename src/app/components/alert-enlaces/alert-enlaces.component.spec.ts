import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEnlacesComponent } from './alert-enlaces.component';

describe('AlertEnlacesComponent', () => {
  let component: AlertEnlacesComponent;
  let fixture: ComponentFixture<AlertEnlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertEnlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertEnlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
