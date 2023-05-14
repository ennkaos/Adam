import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveToast, ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersModels } from './models/UsersModels';
import { FormGroup } from '@angular/forms';
import { LoggedUser } from './models/LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: String = 'http://localhost:3000';
  urlMock: string = 'http://localhost:3000';
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

  loginRequest(profileForm: FormGroup): ActiveToast<any> {
    try {
      if (!this.token) {
        this.http
          .post(this.url + '/Login/', profileForm, this.httpOptions)
          .subscribe((response: LoggedUser) => {
            if (response) {
              localStorage.setItem('email', response.email);
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', response.role);
              localStorage.setItem('name', response.name);
              if (this.isLogged()) {
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
      return this.toast.show('WTF');
    } catch (error) {
      return this.toast.error(error);
    }
  }

  isLogged(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token && this.token?.length > 0) {
      return true;
    } else {
      return false;
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
  // register() {}
}
