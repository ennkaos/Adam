import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cereri } from '../../models/Cereri';
import { enviroment } from 'src/enviroment/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  cerere$!: Observable<Cereri>;
  cereri$!: Observable<Cereri[]>;
  cereriByEmail$!: Observable<Cereri[]>;
  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';

  constructor(public http: HttpClient, private toastr: ToastrService) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  createRequest(profileForm: Cereri): ActiveToast<any> {
    try {
      this.http
        .post(this.url + '/RequestModels/', profileForm, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Cerere a fost adaugata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a mers bine');
    }
  }

  getCereriByEmail(email: string): Observable<Cereri[]> {
    try {
      this.cereriByEmail$ = this.http
        .get(this.url + '/RequestModels/email?email=' + email, this.httpOptions)
        .pipe(
          tap((result: any) => {
            JSON.stringify(result);
          })
        );
      return this.cereriByEmail$;
    } catch (error) {
      throw error;
    }
  }
  getCereri(): Observable<Cereri[]> {
    try {
      this.cereri$ = this.http
        .get(this.url + '/RequestModels/', this.httpOptions)
        .pipe(
          tap((result: any) => {
            JSON.stringify(result);
          })
        );
      return this.cereri$;
    } catch (error) {
      throw error;
    }
  }
  update(id: number, data: Cereri): ActiveToast<any> {
    console.log(id, data);
    try {
      this.http
        .post(this.url + '/RequestModels/' + id, { ...data }, this.httpOptions)
        .subscribe((response) => console.log(JSON.stringify(response)));
      return this.toastr.success('Cererea a fost modificata cu succes');
    } catch (error) {
      return this.toastr.error('Ceva nu a functionat ..');
    }
  }
  delete(id: number): ActiveToast<any> {
    try {
      console.log(id);
      this.http
        .delete(this.url + '/RequestModels/' + id, this.httpOptions)
        .subscribe((response) => console.log(response));
      return this.toastr.success('Cererea a fost stearsa cu succes');
    } catch (error) {
      return this.toastr.error('Ceva a mers gresit..');
    }
  }
  getRequestById(id: number): Observable<Cereri> {
    try {
      this.cerere$ = this.http
        .get(this.url + '/RequestModels/' + id, this.httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(JSON.stringify(result));
          })
        );

      return this.cerere$;
    } catch (error) {
      throw error;
    }
  }
}
