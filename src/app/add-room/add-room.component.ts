import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AddRoomService } from './services/add-room-service';
import { RoomsModel } from '../models/RoomsModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent {
  rooms$!: Observable<RoomsModel[]>;
  roomsResult!: RoomsModel[];

  constructor(public addroomService: AddRoomService) {}
  ngOnInit(): void {
    this.rooms$ = this.addroomService.getRooms();
    this.rooms$.subscribe((e) => {
      console.log('Subscription Started ...');

      this.roomsResult = e;
    });
  }
  delete(id: number): void {
    try {
      this.addroomService.deleteRoom(id);
    } catch (error) {
      throw error;
    }
  }
}
