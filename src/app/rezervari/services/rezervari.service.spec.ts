import { TestBed } from '@angular/core/testing';

import { RezervariService } from './rezervari.service';

describe('RezervariService', () => {
  let service: RezervariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RezervariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
