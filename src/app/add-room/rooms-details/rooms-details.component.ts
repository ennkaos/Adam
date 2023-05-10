import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRoomService } from '../services/add-room-service';
import { EMPTY, Observable } from 'rxjs';
import { RoomsModel } from 'src/app/models/RoomsModel';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.component.html',
  styleUrls: ['./rooms-details.component.css'],
})
export class RoomsDetailsComponent {
  room$!: Observable<RoomsModel>;

  roomResult!: RoomsModel;
  constructor(
    private route: ActivatedRoute,
    private addRoomService: AddRoomService
  ) {}
  roomId = this.route.snapshot.paramMap.get('id')
    ? this.route.snapshot.paramMap.get('id')
    : null;

  ngOnInit(): void {
    this.room$ = this.addRoomService.getRoom(Number(this.roomId))
      ? this.addRoomService.getRoom(Number(this.roomId))
      : EMPTY;
    this.room$.subscribe((e) => {
      this.roomResult = e;
    });
  }
}
