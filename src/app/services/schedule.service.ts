import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Schedule } from '../models/Schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  url: String = 'http://localhost:3000';
  schedule!: Observable<Schedule>;

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
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
}
