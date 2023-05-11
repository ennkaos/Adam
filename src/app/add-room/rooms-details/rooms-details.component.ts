import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRoomService } from '../services/add-room-service';
import { EMPTY, Observable } from 'rxjs';
import { RoomsModel } from 'src/app/models/RoomsModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.component.html',
  styleUrls: ['./rooms-details.component.css'],
})
export class RoomsDetailsComponent {
  room$!: Observable<RoomsModel>;
  router!: string | undefined;
  editable!: boolean;
  profileForm!: FormGroup;
  roomResult!: RoomsModel;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private addRoomService: AddRoomService,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      name: [''],
      capacity: [''],
      labRoom: [''],
    });
  }

  ngOnInit(): void {
    this.router = this.route.snapshot.url.shift()?.path;
    const roomId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;
    if (roomId !== null) {
      if (this.router === 'details') {
        this.profileForm.disable();
        this.editable = false;
      } else {
        this.editable = true;
      }
      this.room$ = this.addRoomService.getRoom(Number(roomId))
        ? this.addRoomService.getRoom(Number(roomId))
        : EMPTY;
      this.room$.subscribe((e) => {
        this.roomResult = e;
        this.profileForm.controls['name'].setValue(this.roomResult.name);
        this.profileForm.controls['capacity'].setValue(
          this.roomResult.capacity
        );
        this.profileForm.controls['labRoom'].setValue(this.roomResult.labRoom);
      });
    }
  }

  onSubmit() {}
  onReset() {
    console.log(this.profileForm.touched, this.router);
    if (this.profileForm.touched) {
      if (this.router === 'create') {
        this.profileForm = this.fb.group({
          name: [''],
          capacity: [''],
          labRoom: [''],
        });
        this.toastr.success('Resetat cu success');
      } else if (this.router === 'update') {
        this.profileForm = this.fb.group({
          name: [this.roomResult.name],
          capacity: [this.roomResult.capacity],
          labRoom: [this.roomResult.labRoom],
        });
        this.toastr.success('Resetat cu success');
      }
    } else {
      this.toastr.error('Nu ai modificat nimic');
    }
  }
}
