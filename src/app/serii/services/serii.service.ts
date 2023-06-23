import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { SeriiModel } from 'src/app/models/SeriiModel';

@Injectable({
  providedIn: 'root',
})
export class SeriiService {
  serii!: Observable<SeriiModel[]>;
  serie!: Observable<SeriiModel>;
  url: string = '/api';

  constructor(public http: HttpClient, private toastr: ToastrService) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  create(profileForm: SeriiModel): ActiveToast<any> {
    try {
      this.http
        .post(this.url + '/SerieModels/', profileForm, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Seria a fost adaugata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a mers bine');
    }
  }
  get(): Observable<SeriiModel[]> {
    try {
      return (this.serii = this.http
        .get(this.url + '/SerieModels/', this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        ));
    } catch (error) {
      throw error;
    }
  }
  update(id: number, data: SeriiModel): ActiveToast<any> {
    try {
      this.http
        .post(this.url + '/SerieModels/' + id, { ...data }, this.httpOptions)
        .subscribe((response) => console.log(JSON.stringify(response)));
      return this.toastr.success('Seria a fost modificata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a functionat ..');
    }
  }
  delete(id: number): ActiveToast<any> {
    try {
      this.http
        .delete(this.url + '/SerieModels/' + id, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Seria a fost stearsa cu succes');
    } catch (error) {
      return this.toastr.error('Ceva a mers gresit..');
    }
  }
  getMaterie(id: number): Observable<SeriiModel> {
    try {
      this.serie = this.http
        .get(this.url + '/SerieModels/' + id, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.serie;
    } catch (error) {
      throw error;
    }
  }
}
