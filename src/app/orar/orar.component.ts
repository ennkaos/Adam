import { Component } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';

import { scheduleDay, hours, days } from '../models/scheduleModel';
import { OrarService } from './services/orar.service';
import { GroupModel } from '../models/GroupModel';
import { UsersModels } from '../models/UsersModels';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-orar',
  templateUrl: './orar.component.html',
  styleUrls: ['./orar.component.css'],
})
export class OrarComponent {
  serie!: string;
  grupa!: string;
  index: number = 0;
  indexAr: number[] = [];
  scheduleDay: any;
  user$: Observable<UsersModels>;
  lengthSubgrupe!: number;
  hours: any;

  days: any;
  schedule!: Observable<GroupModel>;
  scheduleResult!: GroupModel;
  subscribtionSchedule!: Subscription;

  constructor(public scheduleService: OrarService) {
    this.scheduleDay = scheduleDay;
    this.hours = hours;
    this.days = days;
  }

  ngOnInit(): void {
    this.serie = localStorage.getItem('serie');
    this.grupa = localStorage.getItem('grupa');

    this.schedule =
      this.grupa && this.serie
        ? this.scheduleService.getSchedule(this.serie, this.grupa)
        : of(null);
    this.schedule.subscribe((e) => {
      console.log('Subscription Started ...');
      this.scheduleResult = e;
      this.clearArray();
      this.mappingArray();
      this.filterArray();
    });
  }

  unsubscribeSchedule() {
    this.subscribtionSchedule.unsubscribe();
  }
  clearArray() {
    this.scheduleDay.map((element: any) => {
      element.hours.map((e: any) => {
        e.appointments = [];
      });
    });
  }

  mappingArray() {
    this.scheduleResult.subgrupe.forEach((subgroup) => {
      this.lengthSubgrupe = this.scheduleResult.subgrupe.length;
      subgroup.week.forEach((day, index) => {
        let counter: number = 0;
        day.reservations.forEach((reservations) => {
          if (
            reservations &&
            !reservations.isLab &&
            reservations.timeSlotsUsed === 2
          ) {
            this.scheduleDay[index].hours[counter].appointments.push(
              reservations
            );
            this.scheduleDay[index].hours[counter + 1].appointments.push(
              undefined
            );
            counter = counter + 2;
          } else if (
            reservations &&
            !reservations.isLab &&
            reservations.timeSlotsUsed === 3
          ) {
            this.scheduleDay[index].hours[counter].appointments.push(
              reservations
            );
            this.scheduleDay[index].hours[counter + 1].appointments.push(
              undefined
            );
            this.scheduleDay[index].hours[counter + 2].appointments.push(
              undefined
            );
            counter = counter + 3;
          } else if (
            reservations &&
            reservations.isLab &&
            reservations.timeSlotsUsed === 2
          ) {
            this.scheduleDay[index].hours[counter].appointments.push(
              reservations
            );
            this.scheduleDay[index].hours[counter + 1].appointments.push(
              undefined
            );
            counter = counter + 2;
          } else if (
            reservations &&
            reservations.isLab &&
            reservations.timeSlotsUsed === 3
          ) {
            this.scheduleDay[index].hours[counter].appointments.push(
              reservations
            );
            this.scheduleDay[index].hours[counter + 1].appointments.push(
              undefined
            );
            this.scheduleDay[index].hours[counter + 2].appointments.push(
              undefined
            );
            counter = counter + 3;
          } else if (reservations !== undefined && reservations === null) {
            this.scheduleDay[index].hours[counter].appointments.push(
              reservations
            );

            counter++;
          }
        });
      });
    });
  }

  filterArray() {
    this.scheduleDay.map((day: any) => {
      this.indexAr = [];
      day.hours.forEach((item: any) => {
        item.appointments.forEach((item2: any, index2: number) => {
          if (item2 && item2 !== undefined) {
            if (item2.isLab == false) {
              item.appointments.splice(index2 + 1, item.appointments.length);
            } else if (item2.isLab == true) {
              if (item2.groups == true) {
                item.appointments.splice(index2, 1);
              }
            }
          }
        });
      });
    });
  }
}
