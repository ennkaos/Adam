import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRoomService } from '../services/add-room-service';
import { EMPTY, Observable, empty, of, tap } from 'rxjs';
import { RoomsModel } from 'src/app/models/RoomsModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.component.html',
  styleUrls: ['./rooms-details.component.css'],
})
export class RoomsDetailsComponent {
  room$?: Observable<RoomsModel> = new Observable<RoomsModel>();
  router!: string | undefined;
  editable!: boolean;
  profileForm!: FormGroup;
  roomResult!: RoomsModel;
  roomId!: null | string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private addRoomService: AddRoomService,
    private toastr: ToastrService,
    private router2: Router
  ) {}

  ngOnInit(): void {
    this.router = this.route.snapshot.url.shift()?.path;
    this.roomId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;

    this.profileForm =
      this.router === 'create'
        ? this.fb.group({
            name: ['', Validators.required],
            capacity: ['', Validators.required],
            labRoom: [false, Validators.required],
          })
        : this.fb.group({
            id: [''],
            name: ['', Validators.required],
            capacity: ['', Validators.required],
            labRoom: [false, Validators.required],
          });

    if (this.router === 'details') {
      this.profileForm.disable();
      this.editable = false;
    } else {
      this.editable = true;
    }
    if (this.roomId !== null) {
      this.room$ = this.addRoomService.getRoom(Number(this.roomId))
        ? this.addRoomService.getRoom(Number(this.roomId))
        : EMPTY;

      this.room$.subscribe((e) => {
        this.roomResult = e;

        this.profileForm.controls['name'].setValue(this.roomResult.name);
        this.profileForm.controls['id'].setValue(this.roomId);
        this.profileForm.controls['capacity'].setValue(
          this.roomResult.capacity
        );
        this.profileForm.controls['labRoom'].setValue(this.roomResult.labRoom);
      });
    } else {
      this.room$ = of({ id: 1, capacity: 1, labRoom: true, name: '' });
      this.room$.subscribe();
    }
  }

  onSubmit() {
    if (this.router === 'update') {
      if (
        !this.profileForm.controls['name'].errors &&
        !this.profileForm.controls['capacity'].errors
      ) {
        if (!this.roomId) this.toastr.warning('Nu exista Id-ul salii');
        if (
          this.profileForm.controls['name'].dirty ||
          this.profileForm.controls['capacity'].dirty ||
          this.profileForm.controls['labRoom'].dirty
        ) {
          this.addRoomService.updateRoom(
            Number(this.roomId),
            this.profileForm.value
          );
          this.router2.navigate(['add-room']);
        } else {
          this.toastr.warning('Modifica o proprietate inainte de a salva !');
        }
      } else {
        this.toastr.warning('Pentru a face update trebuie sa modici datele!');
      }
    } else {
      if (
        !this.profileForm.controls['name'].errors &&
        !this.profileForm.controls['capacity'].errors
      ) {
        this.addRoomService.createRoom(this.profileForm.value);
        this.router2.navigate(['add-room']);
      } else {
        this.toastr.warning(
          'Pentru a creea o sala trebuie sa introduci toate datele!'
        );
      }
    }
  }
  onReset() {
    console.log(this.profileForm.touched, this.router);
    if (this.profileForm.touched) {
      if (this.router === 'create') {
        this.profileForm.controls['name'].setValue(this.roomResult.name);
        this.profileForm.controls['capacity'].setValue(
          this.roomResult.capacity
        );
        this.profileForm.controls['labRoom'].setValue(this.roomResult.labRoom);
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
