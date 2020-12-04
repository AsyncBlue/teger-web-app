import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGuardarVotosComponent } from './alert-guardar-votos.component';

describe('AlertGuardarVotosComponent', () => {
  let component: AlertGuardarVotosComponent;
  let fixture: ComponentFixture<AlertGuardarVotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertGuardarVotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGuardarVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
