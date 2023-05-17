import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { MateriiModel } from '../../models/MateriiModel';
import { Observable, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class MateriiService {
  materii!: Observable<MateriiModel[]>;
  materie!: Observable<MateriiModel>;
  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';
  constructor(public http: HttpClient, private toastr: ToastrService) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  create(profileForm: MateriiModel): ActiveToast<any> {
    try {
      this.http
        .post(this.url + '/MaterieModels/', profileForm, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Sala a fost adaugata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a mers bine');
    }
  }

  get(): Observable<MateriiModel[]> {
    try {
      return (this.materii = this.http
        .get(this.url + '/MaterieModels/', this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        ));
    } catch (error) {
      throw error;
    }
  }
  update(id: number, data: MateriiModel): ActiveToast<any> {
    console.log(id, data);
    try {
      this.http
        .post(this.url + '/MaterieModels/' + id, { ...data }, this.httpOptions)
        .subscribe((response) => console.log(HttpStatusCode.Accepted));
      return this.toastr.success('Sala a fost modificata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a functionat ..');
    }
  }

  delete(id: number): ActiveToast<any> {
    try {
      console.log(id);
      this.http
        .delete(this.url + '/MaterieModels/' + id, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Sala a fost stearsa cu succes');
    } catch (error) {
      return this.toastr.error('Ceva a mers gresit..');
    }
  }
  getMaterie(id: number): Observable<MateriiModel> {
    try {
      this.materie = this.http
        .get(this.url + '/MaterieModels/' + id, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.materie;
    } catch (error) {
      throw error;
    }
  }
}
