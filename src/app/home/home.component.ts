import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../models/Schedule';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  schedule: Observable<Schedule>;
  scheduleResult!: Schedule;
  constructor(public scheduleService: ScheduleService) {
    this.schedule = new Object() as Observable<Schedule>;
  }

  ngOnInit(): void {
    this.schedule = this.scheduleService.getSchedule();
    this.schedule.subscribe((e) => {
      console.log(e);
    });
  }
}
