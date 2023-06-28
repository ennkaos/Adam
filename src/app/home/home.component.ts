import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SerieModel } from '../models/SerieModel';
import { ScheduleService } from './services/schedule.service';
import { days, hours, scheduleDay, serie } from '../models/scheduleModel';
import { SeriiModel } from '../models/SeriiModel';
import { SeriiService } from '../serii/services/serii.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedSerie: string;
  serii$: Observable<SeriiModel[]>;
  seriiSubscriber: Subscription;
  showSerie!: SerieModel;
  index: number = 0;
  indexAr: number[] = [];
  scheduleDay: any;
  lengthSerie!: number;
  hours: any;
  days: any;
  schedule!: Observable<SerieModel>;
  scheduleSubscriber: Subscription;
  scheduleResult!: SerieModel;
  subscribtionSchedule!: Subscription;

  constructor(
    public scheduleService: ScheduleService,
    private seriiService: SeriiService
  ) {
    this.scheduleDay = scheduleDay;
    this.hours = hours;
    this.days = days;
  }

  ngOnInit(): void {
    this.serii$ = this.seriiService.get();
    this.seriiSubscriber = this.serii$.subscribe();
  }
  subscribeSchedule(value: string) {
    this.schedule = this.scheduleService.getSchedule(value);
    this.scheduleSubscriber = this.schedule.subscribe((e) => {
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
    this.scheduleResult.grupe.map((e) => {
      this.lengthSerie = this.scheduleResult.grupe.length;
      e.subgrupe.forEach((subgroup) => {
        subgroup.week.forEach((day, index) => {
          let counter: number = 0;
          day.reservations.forEach((reservations, indexHours) => {
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
    });
  }

  onChangeSerieSelect(event): void {
    this.subscribeSchedule(event);
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
  ngOnDestroy() {
    !!this.seriiSubscriber ? this.seriiSubscriber.unsubscribe() : null;
    !!this.scheduleSubscriber ? this.scheduleSubscriber.unsubscribe() : null;
  }
}
