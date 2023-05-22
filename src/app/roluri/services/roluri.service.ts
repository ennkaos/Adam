import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { UsersModels } from 'src/app/models/UsersModels';
import { enviroment } from 'src/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class RoluriService {
  users$!: Observable<UsersModels[]>;
  user$!: Observable<UsersModels>;
  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';

  constructor(public http: HttpClient, private toastr: ToastrService) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  createUser(profileForm: UsersModels): ActiveToast<any> {
    try {
      console.log(profileForm);
      this.http
        .post(this.url + '/UsersModels/', profileForm, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Account a fost adaugat cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a mers bine');
    }
  }

  getUsers(): Observable<UsersModels[]> {
    try {
      this.users$ = this.http
        .get(this.url + '/UsersModels/', this.httpOptions)
        .pipe(
          tap((result: any) => {
            JSON.stringify(result);
          })
        );
      return this.users$;
    } catch (error) {
      throw error;
    }
  }
  updateUser(id: number, data: UsersModels): ActiveToast<any> {
    console.log(id, data);
    try {
      this.http
        .put(this.url + '/UsersModels/' + id, data, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Sala a fost modificata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a functionat ..');
    }
  }

  deleteUser(id: number): ActiveToast<any> {
    try {
      console.log(id);
      this.http
        .delete(this.url + '/UsersModels/' + id, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Sala a fost stearsa cu succes');
    } catch (error) {
      return this.toastr.error('Ceva a mers gresit..');
    }
  }
  getUser(id: number): Observable<UsersModels> {
    try {
      this.user$ = this.http
        .get(this.url + '/UsersModels/' + id, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.user$;
    } catch (error) {
      throw error;
    }
  }
}
