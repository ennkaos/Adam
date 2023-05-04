import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/AppointmentModel';
import { Schedule } from '../models/Schedule';
import { SerieModel } from '../models/SerieModel';
import { ScheduleService } from '../services/schedule.service';
import { days, hours, scheduleDay } from '../models/scheduleModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedSerie: any = null;
  showSerie!: SerieModel;
  index: number = 0;
  indexAr: number[] = [];
  scheduleDay: any;
  lengthSerie!: number;
  hours: any;
  days: any;
  schedule!: Observable<Schedule>;
  scheduleResult!: SerieModel[];

  constructor(public scheduleService: ScheduleService) {
    this.scheduleDay = scheduleDay;
    this.hours = hours;
    this.days = days;
  }

  ngOnInit(): void {
    this.schedule = this.scheduleService.getSchedule();
    this.schedule.subscribe((e) => {
      console.log('Subscription Started ...');

      this.scheduleResult = e.series;
    });
  }

  clearArray() {
    this.scheduleDay.map((element: any) => {
      element.hours.map((e: any) => {
        e.appointments = [];
      });
    });
  }

  mappingArray() {
    this.showSerie.groups.map((e) => {
      this.lengthSerie = this.showSerie.groups.length;
      e.subgroups.forEach((subgroup) => {
        subgroup.days.forEach((day, index) => {
          let counter: number = 0;
          day.appointments.forEach((app, indexHours) => {
            if (app && !app.IsLab && app.timeSlotsUsed === 2) {
              this.scheduleDay[index].hours[counter].appointments.push(app);
              this.scheduleDay[index].hours[counter + 1].appointments.push(
                undefined
              );
              counter = counter + 2;
            } else if (app && !app.IsLab && app.timeSlotsUsed === 3) {
              this.scheduleDay[index].hours[counter].appointments.push(app);
              this.scheduleDay[index].hours[counter + 1].appointments.push(
                undefined
              );
              this.scheduleDay[index].hours[counter + 2].appointments.push(
                undefined
              );
              counter = counter + 3;
            } else if (app && app.IsLab && app.timeSlotsUsed === 2) {
              this.scheduleDay[index].hours[counter].appointments.push(app);
              this.scheduleDay[index].hours[counter + 1].appointments.push(
                undefined
              );
              counter = counter + 2;
            } else if (app && app.IsLab && app.timeSlotsUsed === 3) {
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

  onChangeSerieSelect(event: number): void {
    this.selectedSerie = event;
    this.clearArray();

    this.showSerie = this.scheduleResult.filter(
      (result) => result.id === this.selectedSerie
    )[0];
    this.mappingArray();
    this.filterArray();
  }
  filterArray() {
    this.scheduleDay.map((day: any) => {
      this.indexAr = [];
      day.hours.forEach((item: any) => {
        item.appointments.forEach((e: any, index2: number) => {
          if (e && !e.IsLab) {
            item.appointments.splice(index2 + 1, item.appointments.length);
          } else if (e && e.IsLab) {
            if (e.groups) {
              item.appointments.splice(index2, 1);
            }
          }
        });
      });
    });
  }
}
