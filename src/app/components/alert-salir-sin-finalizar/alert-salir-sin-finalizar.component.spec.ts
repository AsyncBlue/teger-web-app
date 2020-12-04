import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSalirSinFinalizarComponent } from './alert-salir-sin-finalizar.component';

describe('AlertSalirSinFinalizarComponent', () => {
  let component: AlertSalirSinFinalizarComponent;
  let fixture: ComponentFixture<AlertSalirSinFinalizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertSalirSinFinalizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSalirSinFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
