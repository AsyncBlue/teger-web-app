import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertIniciarEnlacesComponent } from './alert-iniciar-enlaces.component';

describe('AlertIniciarEnlacesComponent', () => {
  let component: AlertIniciarEnlacesComponent;
  let fixture: ComponentFixture<AlertIniciarEnlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertIniciarEnlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertIniciarEnlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
