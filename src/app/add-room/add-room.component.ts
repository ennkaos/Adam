import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AddRoomService } from './services/add-room-service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent {
  rooms!: Observable<any>;
  roomsResult!: Observable<any>;

  constructor(public addroomService: AddRoomService) {}
  ngOnInit(): void {
    this.rooms = this.addroomService.getRooms();
    this.rooms.subscribe((e) => {
      console.log('Subscription Started ...');

      this.roomsResult = e;
    });
  }
}
