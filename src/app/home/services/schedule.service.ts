import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SerieModel } from '../../models/SerieModel';
import { enviroment } from 'src/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';
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
