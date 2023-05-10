import { TestBed } from '@angular/core/testing';

import { AddRoomService } from './add-room-service';

describe('AddRoomServicesService', () => {
  let service: AddRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
