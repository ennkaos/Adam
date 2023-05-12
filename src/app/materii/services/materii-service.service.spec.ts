import { TestBed } from '@angular/core/testing';

import { MateriiServiceService } from './materii-service.service';

describe('MateriiServiceService', () => {
  let service: MateriiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
