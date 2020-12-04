import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBorrarEventoComponent } from './alert-borrar-evento.component';

describe('AlertBorrarEventoComponent', () => {
  let component: AlertBorrarEventoComponent;
  let fixture: ComponentFixture<AlertBorrarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertBorrarEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBorrarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
