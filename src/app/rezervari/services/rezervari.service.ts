import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { AppointmentModel } from 'src/app/models/AppointmentModel';
import { enviroment } from 'src/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class RezervariService {
  appointment$!: Observable<AppointmentModel>;
  appointments$!: Observable<AppointmentModel[]>;

  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';
  constructor(public http: HttpClient, private toastr: ToastrService) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  createAppointment(profileForm: AppointmentModel): ActiveToast<any> {
    try {
      this.http
        .post(this.url + '/ReservationModel/', profileForm, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Cerere a fost adaugata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a mers bine');
    }
  }
  getAppointments(): Observable<AppointmentModel[]> {
    try {
      this.appointments$ = this.http
        .get(this.url + '/ReservationModel/', this.httpOptions)
        .pipe(
          tap((result: any) => {
            JSON.stringify(result);
          })
        );
      return this.appointments$;
    } catch (error) {
      throw error;
    }
  }
  update(id: number, data: AppointmentModel): ActiveToast<any> {
    try {
      this.http
        .post(
          this.url + '/ReservationModel/' + id,
          { ...data },
          this.httpOptions
        )
        .subscribe((response) => console.log(JSON.stringify(response)));
      return this.toastr.success('Activitatea a fost modificata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a functionat ..');
    }
  }
  delete(id: number): ActiveToast<any> {
    try {
      this.http
        .delete(this.url + '/ReservationModel/' + id, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Activitatea a fost stearsa cu succes');
    } catch (error) {
      return this.toastr.error('Ceva a mers gresit..');
    }
  }

  getAppointmentById(id: number): Observable<AppointmentModel> {
    try {
      this.appointment$ = this.http
        .get(this.url + '/ReservationModel/' + id, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.appointment$;
    } catch (error) {
      throw error;
    }
  }
}
