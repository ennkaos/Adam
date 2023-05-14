import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { RoomsModel } from 'src/app/models/RoomsModel';

@Injectable({
  providedIn: 'root',
})
export class AddRoomService {
  rooms!: Observable<RoomsModel[]>;
  room!: Observable<RoomsModel>;
  url: String = 'http://localhost:3000';
  urlMock: string = 'http://localhost:3000';

  constructor(public http: HttpClient, private toastr: ToastrService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  createRoom(profileForm: RoomsModel): ActiveToast<any> {
    try {
      console.log(profileForm);
      this.http
        .post(this.url + '/Rooms/', profileForm, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Sala a fost adaugata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a mers bine');
    }
  }

  getRooms(): Observable<RoomsModel[]> {
    try {
      this.rooms = this.http.get(this.url + '/Rooms/', this.httpOptions).pipe(
        tap((result: any) => {
          console.log({ xxx: JSON.stringify(result) });
        })
      );
      return this.rooms;
    } catch (error) {
      throw error;
    }
  }
  updateRoom(id: number, data: RoomsModel): ActiveToast<any> {
    console.log(id, data);
    try {
      this.http
        .put(this.url + '/Rooms/' + id, data, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Sala a fost modificata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a functionat ..');
    }
  }

  deleteRoom(id: number): ActiveToast<any> {
    try {
      console.log(id);
      this.http
        .delete(this.url + '/Rooms/' + id, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Sala a fost stearsa cu succes');
    } catch (error) {
      return this.toastr.error('Ceva a mers gresit..');
    }
  }
  getRoom(id: number): Observable<RoomsModel> {
    try {
      this.room = this.http
        .get(this.url + '/Rooms/' + id, this.httpOptions)
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
