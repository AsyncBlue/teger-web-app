import { TestBed } from '@angular/core/testing';

import { TejidoService } from './tejido.service';

describe('TejidoService', () => {
  let service: TejidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TejidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
