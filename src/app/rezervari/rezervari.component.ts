import { Component } from '@angular/core';
import { AppointmentModel } from '../models/AppointmentModel';
import { Observable, Subject } from 'rxjs';
import { LoginService } from '../login.service';
import { RezervariService } from './services/rezervari.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rezervari',
  templateUrl: './rezervari.component.html',
  styleUrls: ['./rezervari.component.css'],
})
export class RezervariComponent {
  appointments$!: Observable<AppointmentModel[]>;
  appointmentsResult!: AppointmentModel[];
  sortResult: Subject<AppointmentModel[]> = new Subject();
  initialData: any[];

  constructor(
    public rezervariService: RezervariService,
    public loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.appointments$ = this.rezervariService.getAppointments();
    this.appointments$.subscribe((appointments) => {
      console.log('subscription started...');
      console.log(appointments);
      this.appointmentsResult = appointments;
    });
  }
  sort($event) {
    this.appointmentsResult = $event;
  }
  filter($event) {
    if ($event) {
      this.appointmentsResult = $event;
    } else {
      this.appointmentsResult = this.initialData;
    }
  }
  edit() {}
  delete(arg0: number) {
    this.rezervariService.delete(arg0);
    this.appointmentsResult = this.appointmentsResult.filter(
      (cerere) => cerere.id !== arg0
    );
    this.initialData = this.initialData.filter((cerere) => cerere.id !== arg0);
  }
}
