import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
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
  showSerie!: Schedule;
  schedule!: Observable<[Schedule]>;
  scheduleResult!: Schedule[];
  days: string[] = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri'];
  hours: string[] = [
    '8-9',
    '9-10',
    '10-11',
    '11-12',
    '12-13',
    '13-14',
    '15-16',
    '16-17',
    '18-19',
    '19-20',
  ];
  constructor(public scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.schedule = this.scheduleService.getSchedule();
    this.schedule.subscribe((e) => {
      console.log('Subscription Started ...');
      this.scheduleResult = e;
    });
  }
  onChangeSerieSelect(event: string): void {
    this.selectedSerie = event;
    console.log(this.selectedSerie);
    this.showSerie = this.scheduleResult.filter(
      (e: Schedule) => e.id === this.selectedSerie
    )[0];
    console.log(this.showSerie);
  }
}
