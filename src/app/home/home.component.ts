import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/AppointmentModel';
import { Schedule } from '../models/Schedule';
import { SerieModel } from '../models/SerieModel';
import { ScheduleService } from '../services/schedule.service';

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
  schedule!: Observable<Schedule>;
  scheduleResult!: SerieModel[];

  scheduleDay: any[] = [
    {
      day: 'Monday',
      hours: [
        { h: 0, appointments: [] },
        { h: 1, appointments: [] },
        { h: 2, appointments: [] },
        { h: 3, appointments: [] },
        { h: 4, appointments: [] },
        { h: 5, appointments: [] },
        { h: 6, appointments: [] },
        { h: 7, appointments: [] },
        { h: 8, appointments: [] },
        { h: 9, appointments: [] },
        { h: 10, appointments: [] },
        { h: 11, appointments: [] },
      ],
    },
    {
      day: 'Thusday',
      hours: [
        { h: 0, appointments: [] },
        { h: 1, appointments: [] },
        { h: 2, appointments: [] },
        { h: 3, appointments: [] },
        { h: 4, appointments: [] },
        { h: 5, appointments: [] },
        { h: 6, appointments: [] },
        { h: 7, appointments: [] },
        { h: 8, appointments: [] },
        { h: 9, appointments: [] },
        { h: 10, appointments: [] },
        { h: 11, appointments: [] },
      ],
    },
    {
      day: 'Thursday',
      hours: [
        { h: 0, appointments: [] },
        { h: 1, appointments: [] },
        { h: 2, appointments: [] },
        { h: 3, appointments: [] },
        { h: 4, appointments: [] },
        { h: 5, appointments: [] },
        { h: 6, appointments: [] },
        { h: 7, appointments: [] },
        { h: 8, appointments: [] },
        { h: 9, appointments: [] },
        { h: 10, appointments: [] },
        { h: 11, appointments: [] },
      ],
    },
    {
      day: 'Wensday',
      hours: [
        { h: 0, appointments: [] },
        { h: 1, appointments: [] },
        { h: 2, appointments: [] },
        { h: 3, appointments: [] },
        { h: 4, appointments: [] },
        { h: 5, appointments: [] },
        { h: 6, appointments: [] },
        { h: 7, appointments: [] },
        { h: 8, appointments: [] },
        { h: 9, appointments: [] },
        { h: 10, appointments: [] },
        { h: 11, appointments: [] },
      ],
    },
    {
      day: 'Friday',
      hours: [
        { h: 0, appointments: [] },
        { h: 1, appointments: [] },
        { h: 2, appointments: [] },
        { h: 3, appointments: [] },
        { h: 4, appointments: [] },
        { h: 5, appointments: [] },
        { h: 6, appointments: [] },
        { h: 7, appointments: [] },
        { h: 8, appointments: [] },
        { h: 9, appointments: [] },
        { h: 10, appointments: [] },
        { h: 11, appointments: [] },
      ],
    },
  ];
  days: string[] = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri'];
  hours: string[] = [
    '8-9',
    '9-10',
    '10-11',
    '11-12',
    '12-13',
    '13-14',
    '14-15',
    '15-16',
    '16-17',
    '17-18',
    '18-19',
    '19-20',
  ];

  constructor(public scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.schedule = this.scheduleService.getSchedule();
    this.schedule.subscribe((e) => {
      console.log('Subscription Started ...');
      console.log(e.series);
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
      e.subgroups.forEach((subgroup) => {
        subgroup.days.forEach((day, index) => {
          let vancea: number = 0;
          day.appointments.forEach((app, indexHours) => {
            if (
              app !== undefined &&
              app !== null &&
              app.IsLab !== null &&
              !app.IsLab &&
              app.timeSlotsUsed === 2
            ) {
              this.scheduleDay[index].hours[vancea].appointments.push(app);
              this.scheduleDay[index].hours[vancea + 1].appointments.push(
                undefined
              );
              vancea = vancea + 2;
            } else if (
              app !== undefined &&
              app !== null &&
              app.IsLab !== null &&
              !app.IsLab &&
              app.timeSlotsUsed === 3
            ) {
              this.scheduleDay[index].hours[vancea].appointments.push(app);
              this.scheduleDay[index].hours[vancea + 1].appointments.push(
                undefined
              );
              this.scheduleDay[index].hours[vancea + 2].appointments.push(
                undefined
              );
              vancea = vancea + 3;
            } else if (
              app !== undefined &&
              app !== null &&
              app.IsLab &&
              app.timeSlotsUsed === 2
            ) {
              this.scheduleDay[index].hours[vancea].appointments.push(app);
              this.scheduleDay[index].hours[vancea + 1].appointments.push(
                undefined
              );
              vancea = vancea + 2;
            } else if (
              app !== undefined &&
              app !== null &&
              app.IsLab &&
              app.timeSlotsUsed === 3
            ) {
              this.scheduleDay[index].hours[vancea].appointments.push(app);
              this.scheduleDay[index].hours[vancea + 1].appointments.push(
                undefined
              );
              this.scheduleDay[index].hours[vancea + 2].appointments.push(
                undefined
              );
              vancea = vancea + 3;
              console.log(app, vancea);
            } else if (app !== undefined && app === null) {
              this.scheduleDay[index].hours[vancea].appointments.push(app);

              vancea++;
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
    console.log(this.scheduleDay);
  }
  filterArray() {
    this.scheduleDay.map((day) => {
      day.hours.forEach((item: any, index: any) => {
        item.appointments.forEach((e: any) => {
          if (
            e !== null &&
            e !== undefined &&
            item.appointments[index + 1] !== null &&
            item.appointments[index + 1] !== undefined &&
            e.roomId === item.appointments[index + 1].roomId
          ) {
            console.log(index);
            this.indexAr.push(index);
          } else if (
            e !== null &&
            e !== undefined &&
            item.appointments[index - 1] !== undefined &&
            item.appointments[index - 1] !== null &&
            e.roomId === item.appointments[index - 1].roomId
          ) {
            console.log(index);
            this.indexAr.push(index);
          }
        });
        this.indexAr.forEach((item2, index2) => {
          if (index2 !== 0) item.appointments.splice(item2, item2 + 1);
          if ((index2 = this.indexAr.length - 1))
            item.appointments.splice(item2 - 1, item2);
        });

        this.indexAr = [];
      });
    });
  }
}
