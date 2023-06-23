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
  userByMaterie$!: Observable<UsersModels[]>;
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
      this.http
        .post(this.url + '/UserModels/', profileForm, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Userul a fost adaugat cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a mers bine');
    }
  }

  getUsers(): Observable<UsersModels[]> {
    try {
      this.users$ = this.http
        .get(this.url + '/UserModels/', this.httpOptions)
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
    try {
      this.http
        .post(this.url + '/UserModels/' + id, data, this.httpOptions)
        .subscribe((response: UsersModels) => {
          if (id.toString() === localStorage.getItem('id')) {
            localStorage.setItem('id', response?.id.toString());
            localStorage.setItem('email', response?.email.toString());
            localStorage.setItem('token', response?.token);
            localStorage.setItem('role', response?.role.toString());
            localStorage.setItem('name', response?.name);
            if (response.role === 2 && !!response.serie && !!response.grupa) {
              localStorage.setItem('serie', response?.serie);
              localStorage.setItem('grupa', response?.grupa);
            }
          }
        });
      return this.toastr.success('Userul a fost modificat cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a functionat ..');
    }
  }

  deleteUser(id: number): ActiveToast<any> {
    try {
      this.http
        .delete(this.url + '/UserModels/' + id, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Userul a fost stears cu succes');
    } catch (error) {
      return this.toastr.error('Ceva a mers gresit..');
    }
  }
  getUser(id: number): Observable<UsersModels> {
    try {
      this.user$ = this.http
        .get(this.url + '/UserModels/' + id, this.httpOptions)
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

  getUserByMaterie(value: string): Observable<UsersModels[]> {
    try {
      this.userByMaterie$ = this.http
        .get(this.url + '/UserModels/search?Materie=' + value, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.userByMaterie$;
    } catch (error) {
      throw error;
    }
  }
}
