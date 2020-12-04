import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertExpulsarUsuarioComponent } from './alert-expulsar-usuario.component';

describe('AlertExpulsarUsuarioComponent', () => {
  let component: AlertExpulsarUsuarioComponent;
  let fixture: ComponentFixture<AlertExpulsarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertExpulsarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertExpulsarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
