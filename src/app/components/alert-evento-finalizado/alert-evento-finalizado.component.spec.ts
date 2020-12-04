import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEventoFinalizadoComponent } from './alert-evento-finalizado.component';

describe('AlertEventoFinalizadoComponent', () => {
  let component: AlertEventoFinalizadoComponent;
  let fixture: ComponentFixture<AlertEventoFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertEventoFinalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertEventoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
