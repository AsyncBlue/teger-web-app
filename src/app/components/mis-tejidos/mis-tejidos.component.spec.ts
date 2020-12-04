import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTejidosComponent } from './mis-tejidos.component';

describe('MisTejidosComponent', () => {
  let component: MisTejidosComponent;
  let fixture: ComponentFixture<MisTejidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisTejidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTejidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
