import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SerieModel } from '../models/SerieModel';
import { ScheduleService } from './services/schedule.service';
import { days, hours, scheduleDay, serie } from '../models/scheduleModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedSerie: string;
  serie!: string[];
  showSerie!: SerieModel;
  index: number = 0;
  indexAr: number[] = [];
  scheduleDay: any;
  lengthSerie!: number;
  hours: any;
  days: any;
  schedule!: Observable<SerieModel>;
  scheduleResult!: SerieModel;
  subscribtionSchedule!: Subscription;

  constructor(public scheduleService: ScheduleService) {
    this.serie = serie;
    this.scheduleDay = scheduleDay;
    this.hours = hours;
    this.days = days;
  }

  ngOnInit(): void {}
  subscribeSchedule(value: string) {
    this.schedule = this.scheduleService.getSchedule(value);
    this.schedule.subscribe((e) => {
      console.log('Subscription Started ...');

      this.scheduleResult = e;
      console.log(this.scheduleResult);
      this.clearArray();
      console.log(this.scheduleResult);
      //this.showSerie = this.scheduleResult;
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
          day.reservations.forEach((app, indexHours) => {
            if (app && !app.isLab && app.timeSlotsUsed === 2) {
              this.scheduleDay[index].hours[counter].appointments.push(app);
              this.scheduleDay[index].hours[counter + 1].appointments.push(
                undefined
              );
              counter = counter + 2;
            } else if (app && !app.isLab && app.timeSlotsUsed === 3) {
              this.scheduleDay[index].hours[counter].appointments.push(app);
              this.scheduleDay[index].hours[counter + 1].appointments.push(
                undefined
              );
              this.scheduleDay[index].hours[counter + 2].appointments.push(
                undefined
              );
              counter = counter + 3;
            } else if (app && app.isLab && app.timeSlotsUsed === 2) {
              this.scheduleDay[index].hours[counter].appointments.push(app);
              this.scheduleDay[index].hours[counter + 1].appointments.push(
                undefined
              );
              counter = counter + 2;
            } else if (app && app.isLab && app.timeSlotsUsed === 3) {
              this.scheduleDay[index].hours[counter].appointments.push(app);
              this.scheduleDay[index].hours[counter + 1].appointments.push(
                undefined
              );
              this.scheduleDay[index].hours[counter + 2].appointments.push(
                undefined
              );
              counter = counter + 3;
            } else if (app !== undefined && app === null) {
              this.scheduleDay[index].hours[counter].appointments.push(app);

              counter++;
            }
          });
        });
      });
    });
  }

  onChangeSerieSelect(event): void {
    // this.unsubscribeSchedule();
    this.selectedSerie = event.target.value;
    console.log(this.selectedSerie);
    this.subscribeSchedule(this.selectedSerie);
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
