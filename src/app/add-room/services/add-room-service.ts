import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddRoomService {
  rooms: any;
  url: String = '/api';
  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  getRooms(): Observable<any> {
    this.rooms = this.http.get(this.url + '/Rooms/', this.httpOptions).pipe(
      tap((result: any) => {
        console.log(JSON.stringify(result));
      })
    );
    return this.rooms;
  }
}
