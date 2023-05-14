import { Component } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
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
  sortResult: Subject<RoomsModel[]> = new Subject();
  initialData: any[];

  constructor(
    public addroomService: AddRoomService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.rooms$ = this.addroomService.getRooms();
    this.rooms$.subscribe((e) => {
      console.log('Subscription Started ...');
      this.roomsResult = e;
      this.initialData = e;
    });
  }
  sort($event) {
    this.roomsResult = $event;
  }

  filter($event) {
    if ($event) {
      this.roomsResult = $event;
    } else {
      this.roomsResult = this.initialData;
    }
  }
  delete(id: number): void {
    try {
      this.addroomService.deleteRoom(id);
      this.roomsResult = this.roomsResult.filter((e) => e.id !== id);
      this.initialData = this.initialData.filter((e) => e.id !== id);
    } catch (error) {
      this.toastr.error('Ceva a mers gresit ..');
      throw error;
    }
  }
}
