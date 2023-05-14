import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { UsersModels } from './models/UsersModels';
import { FormGroup } from '@angular/forms';
import { LoggedUser } from './models/LoggedUser';
import { Observable, map, of } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';

  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private http: HttpClient
  ) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  loginRequest(profileForm: FormGroup) {
    try {
      if (!this.token) {
        return this.http
          .post(
            this.url + '/Login/Login',
            { ...profileForm, name: '1' },
            this.httpOptions
          )
          .subscribe((response: LoggedUser) => {
            if (response) {
              localStorage.setItem('email', response.email);
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', response.role);
              localStorage.setItem('name', response.name);
              if (this.isLogged()) {
                this.router.navigate(['home']);
                return this.toast.success(
                  response.message + 'Autentificat cu succes'
                );
              } else {
                return this.toast.success('Autentificarea a esuat');
              }
            } else {
              localStorage.clear();
              return this.toast.success('Autentificarea a esuat');
            }
          });
      } else {
        return this.toast.error('Esti deja autentificat');
      }
    } catch (error) {
      return this.toast.error(error);
    }
  }

  isLogged(): Observable<boolean> {
    const response: Observable<boolean> = of(false);
    const localToken = localStorage.getItem('token');
    if (localToken && localToken?.length > 0) {
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      return this.http
        .post(
          this.url + '/Login/ValidatetToken',
          { token: localToken, name, email },
          this.httpOptions
        )
        .pipe(
          map((r: any) => {
            console.log(r);
            return !!r;
          })
        );
    } else {
      return response;
    }
  }

  logOut() {
    if (this.isLogged()) {
      localStorage.clear();
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['login']);
    }
  }
  register(form: FormGroup<any>): ActiveToast<any> {
    if (!!form) {
      this.http
        .post(
          this.url + '/Login/Register',
          {
            name: form.value.name,
            email: form.value.email,
            password: form.value.password,
          },
          this.httpOptions
        )
        .subscribe((response: UsersModels) => {
          this.loginRequest(form);
        });
      return this.toast.success('Inregistrare cu succes');
    } else {
      return this.toast.success('Inregistrarea a esuat');
    }
  }
}
