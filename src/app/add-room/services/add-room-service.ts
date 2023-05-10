import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RoomsModel } from 'src/app/models/RoomsModel';

@Injectable({
  providedIn: 'root',
})
export class AddRoomService {
  rooms!: Observable<RoomsModel[]>;
  room!: Observable<RoomsModel>;
  url: String = '/api';
  urlMock: string = 'http://localhost:3000';
  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  getRooms(): Observable<RoomsModel[]> {
    try {
      this.rooms = this.http
        .get(this.urlMock + '/Rooms/', this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );
      return this.rooms;
    } catch (error) {
      throw error;
    }
  }
  deleteRoom(id: number) {
    try {
      this.room = this.http
        .delete(this.urlMock + '/Rooms/' + id, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.room;
    } catch (error) {
      throw error;
    }
  }
  getRoom(id: number): Observable<RoomsModel> {
    try {
      this.room = this.http
        .get(this.urlMock + '/Rooms/' + id, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.room;
    } catch (error) {
      throw error;
    }
  }
}
