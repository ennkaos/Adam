import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SerieModel } from '../../models/SerieModel';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  url: String = '/api';
  schedule!: Observable<SerieModel>;

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  getSchedule(value: string): Observable<SerieModel> {
    this.schedule = this.http
      .get(this.url + '/schedule/' + value, this.httpOptions)
      .pipe(
        tap((result: any) => {
          JSON.stringify(result);
        })
      );
    return this.schedule;
  }
}
