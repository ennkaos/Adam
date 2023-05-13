import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AddRoomService } from './services/add-room-service';
import { RoomsModel } from '../models/RoomsModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent {
  rooms$!: Observable<RoomsModel[]>;
  roomsResult!: RoomsModel[];

  constructor(
    public addroomService: AddRoomService,
    private toastr: ToastrService
  ) {}
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
      this.ngOnInit();
    } catch (error) {
      this.toastr.error('Ceva a mers gresit ..');
      throw error;
    }
  }
}
