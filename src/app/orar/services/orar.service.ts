import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GroupModel } from 'src/app/models/GroupModel';
import { enviroment } from 'src/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class OrarService {
  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';
  schedule!: Observable<GroupModel>;

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  getSchedule(serie: string, grupa: string): Observable<GroupModel> {
    this.schedule = this.http
      .get(`${this.url}/Schedule/${serie}/${grupa}`, this.httpOptions)
      .pipe(
        tap((result: any) => {
          JSON.stringify(result);
        })
      );
    return this.schedule;
  }
}
