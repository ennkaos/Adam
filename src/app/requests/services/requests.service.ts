import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cereri } from '../../models/Cereri';
import { enviroment } from 'src/enviroment/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
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
}
