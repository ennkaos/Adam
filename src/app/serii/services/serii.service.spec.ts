import { TestBed } from '@angular/core/testing';

import { SeriiService } from './serii.service';

describe('SeriiService', () => {
  let service: SeriiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
