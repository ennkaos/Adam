import { TestBed } from '@angular/core/testing';

import { RoluriService } from './roluri.service';

describe('RoluriService', () => {
  let service: RoluriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoluriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
