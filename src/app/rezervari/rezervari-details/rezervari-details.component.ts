import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, of } from 'rxjs';
import { AppointmentModel } from 'src/app/models/AppointmentModel';
import { RoomsModel } from 'src/app/models/RoomsModel';
import { RezervariService } from '../services/rezervari.service';
import { MateriiService } from 'src/app/materii/services/materii.service';
import { RoluriService } from 'src/app/roluri/services/roluri.service';
import { AddRoomService } from 'src/app/add-room/services/add-room-service';
import {
  Day,
  Parity,
  days,
  duration,
  grupe,
  serie,
  startingHours,
} from 'src/app/models/scheduleModel';
import { MateriiModel } from 'src/app/models/MateriiModel';
import { UsersModels } from 'src/app/models/UsersModels';

@Component({
  selector: 'app-rezervari-details',
  templateUrl: './rezervari-details.component.html',
  styleUrls: ['./rezervari-details.component.css'],
})
export class RezervariDetailsComponent {
  reservation$?: Observable<AppointmentModel> =
    new Observable<AppointmentModel>();
  router!: string | undefined;
  serie: string[];
  selectedSerie: string;
  grupa: string[];
  day: number[];
  materii$: Observable<MateriiModel[]>;
  materiiResult: MateriiModel[];
  teachers$: Observable<UsersModels[]>;
  teachersResult: UsersModels[];
  rooms$: Observable<RoomsModel[]>;
  roomsResult: RoomsModel[];
  editable!: boolean;
  profileForm!: FormGroup;
  reservationResult!: AppointmentModel;
  reservationId!: null | string;
  startingTimeSlots: number[];
  duration: number[];
  parity: number[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private rezervariService: RezervariService,
    private toastr: ToastrService,
    private router2: Router,
    private materiiService: MateriiService,
    private roluriService: RoluriService,
    private addroomService: AddRoomService
  ) {
    this.grupa = grupe;
    this.serie = serie;
    this.day = Day;
    this.startingTimeSlots = startingHours;
    this.duration = duration;
    this.parity = Parity;
  }
  ngOnInit(): void {
    this.router = this.route.snapshot.url.shift()?.path;
    this.reservationId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;
    this.profileForm =
      this.router === 'create'
        ? this.fb.group({
            name: [' '],
            groups: [true, Validators.required],
            teacherName: ['', Validators.required],
            dayNumber: ['', Validators.required],
            subjectName: ['', Validators.required],
            roomName: ['', Validators.required],
            startTimeSlot: ['', Validators.required],
            timeSlotsUsed: ['', Validators.required],
            isOnParity: ['', Validators.required],
            isLab: [true, Validators.required],
            group: ['', Validators.required],
            serie: ['', Validators.required],
            subgroup: [1, Validators.required],
          })
        : this.fb.group({
            id: [''],
            name: [' '],
            groups: [false, Validators.required],
            teacherName: ['', Validators.required],
            dayNumber: [1, Validators.required],
            subjectName: ['', Validators.required],
            roomName: ['', Validators.required],
            startTimeSlot: [1, Validators.required],
            timeSlotsUsed: [1, Validators.required],
            isOnParity: [1, Validators.required],
            isLab: [true, Validators.required],
            group: ['', Validators.required],
            serie: ['', Validators.required],
            subgroup: [1, Validators.required],
          });
    if (this.router === 'details') {
      this.profileForm.disable();
      this.editable = false;
    } else {
      this.editable = true;
    }

    if (this.reservationId !== null) {
      this.reservation$ = this.rezervariService.getAppointmentById(
        Number(this.reservationId)
      )
        ? this.rezervariService.getAppointmentById(Number(this.reservationId))
        : EMPTY;
      this.reservation$.subscribe((e) => {
        this.reservationResult = e;

        this.profileForm.controls['name'].setValue(this.reservationResult.name);
        this.profileForm.controls['id'].setValue(this.reservationId);
        this.profileForm.controls['groups'].setValue(
          this.reservationResult.groups
        );
        this.profileForm.controls['teacherName'].setValue(
          this.reservationResult.teacherName
        );
        this.profileForm.controls['dayNumber'].setValue(
          this.reservationResult.dayNumber
        );
        this.profileForm.controls['subjectName'].setValue(
          this.reservationResult.subjectName
        );
        this.profileForm.controls['roomName'].setValue(
          this.reservationResult.roomName
        );
        this.profileForm.controls['startTimeSlot'].setValue(
          this.reservationResult.startTimeSlot
        );
        this.profileForm.controls['timeSlotsUsed'].setValue(
          this.reservationResult.timeSlotsUsed
        );
        this.profileForm.controls['isOnParity'].setValue(
          this.reservationResult.isOnParity
        );
        this.profileForm.controls['isLab'].setValue(
          this.reservationResult.isLab
        );
        this.profileForm.controls['group'].setValue(
          this.reservationResult.group.substring(2, 3)
        );
        this.profileForm.controls['serie'].setValue(
          this.reservationResult.serie
        );
        this.profileForm.controls['subgroup'].setValue(
          this.reservationResult.subgroup
        );
        this.materii$ = this.materiiService.getMaterieByYear(
          Number(this.reservationResult.serie.substring(0, 1))
        );
        this.teachers$ = this.roluriService.getUserByMaterie(
          this.reservationResult.subjectName
        );
        this.rooms$ = this.addroomService.getRoomByMaterie(
          this.reservationResult.isLab
        );
        this.teachers$.subscribe((teachers) => {
          this.teachersResult = teachers;
        });
        this.materii$.subscribe((materii) => {
          this.materiiResult = materii;
        });
        this.rooms$.subscribe((rooms) => {
          this.roomsResult = rooms;
        });
      });
    } else {
      this.reservation$ = of({
        id: 1,
        name: '',
        groups: false,
        teacherName: '',
        dayNumber: 1,
        subjectName: '',
        roomName: '',
        startTimeSlot: 1,
        timeSlotsUsed: 1,
        isOnParity: 1,
        isLab: true,
        group: '',
        serie: '',
        subgroup: 1,
      });
      this.reservation$.subscribe();
    }
  }
  onSubmit() {
    if (this.router === 'create') {
      if (!this.profileForm.value.isLab) {
        this.profileForm.controls['group'].setValue('1');
      }
      this.rezervariService.createAppointment(this.profileForm.value);
      this.router2.navigate(['home']);
    } else {
      if (!this.profileForm.value.isLab) {
        this.profileForm.controls['group'].setValue('1');
      }
      this.rezervariService.update(
        Number(this.reservationId),
        this.profileForm.value
      );
      this.router2.navigate(['rezervari']);
    }
  }
  onReset() {}
  onChangeSerie(value: string) {
    this.materii$ = this.materiiService.getMaterieByYear(
      Number(value.substring(3, 4))
    );
    this.materii$.subscribe((materii) => {
      this.materiiResult = materii;
    });
  }

  onChangeMaterie(value: string) {
    this.teachers$ = this.roluriService.getUserByMaterie(
      value.substring(3, value.length)
    );
    this.teachers$.subscribe((teachers) => {
      this.teachersResult = teachers;
    });
    this.rooms$ = this.addroomService.getRoomByMaterie(
      this.profileForm.value.isLab
    );
    this.rooms$.subscribe((rooms) => {
      this.roomsResult = rooms;
    });
  }
  onChangeIsLab() {
    this.rooms$ = this.addroomService.getRoomByMaterie(
      this.profileForm.value.isLab
    );
    this.rooms$.subscribe((rooms) => {
      this.roomsResult = rooms;
    });
  }
}
