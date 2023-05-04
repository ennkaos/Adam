import { Component } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent {
  schedule!: Observable<any>;
  scheduleResult!: Observable<any>;

  constructor(public scheduleService: ScheduleService) {}
  ngOnInit(): void {
    this.schedule = this.scheduleService.getPulaMea();
    this.schedule.subscribe((e) => {
      console.log('Subscription Started ...');

      this.scheduleResult = e;
    });
  }
}
