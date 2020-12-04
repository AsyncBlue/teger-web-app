import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDatosComponent } from './alert-datos.component';

describe('AlertDatosComponent', () => {
  let component: AlertDatosComponent;
  let fixture: ComponentFixture<AlertDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
