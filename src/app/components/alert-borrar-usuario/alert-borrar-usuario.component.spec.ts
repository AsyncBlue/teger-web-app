import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBorrarUsuarioComponent } from './alert-borrar-usuario.component';

describe('AlertBorrarUsuarioComponent', () => {
  let component: AlertBorrarUsuarioComponent;
  let fixture: ComponentFixture<AlertBorrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertBorrarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBorrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
