import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Schedule } from '../models/Schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  url: String = '/api';
  schedule!: Observable<Schedule>;

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  getSchedule(): Observable<Schedule> {
    this.schedule = this.http
      .get(this.url + '/schedule', this.httpOptions)
      .pipe(
        tap((result: any) => {
          JSON.stringify(result);
        })
      );
    return this.schedule;
  }

  getPulaMea(): Observable<any> {
    this.schedule = this.http
      .get(this.url + '/RequestModels/1', this.httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(JSON.stringify(result));
        })
      );
    return this.schedule;
  }
}
