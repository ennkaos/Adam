import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { UsersModels } from './models/UsersModels';
import { FormGroup } from '@angular/forms';
import { LoggedUser } from './models/LoggedUser';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroments';
import { Role } from './models/roles';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = enviroment.mode === 'Bucur' ? 'http://localhost:3000' : '/api';
  response: Observable<boolean> = of(false);
  token: string;
  loggedInSubject: BehaviorSubject<{ isLoggedIn: boolean; userRole: string }> =
    enviroment.mode === 'Adam'
      ? new BehaviorSubject({ isLoggedIn: false, userRole: '' })
      : new BehaviorSubject({
          isLoggedIn: true,
          userRole: localStorage.getItem('role'),
        });
  loggedInProfile: BehaviorSubject<UsersModels> = new BehaviorSubject({
    id: 1,
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name'),
    role: Number(localStorage.getItem('role')),
  });
  logged: Observable<boolean>;
  role: Role;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private http: HttpClient
  ) {
    this.token = this.getUser();
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  loginRequest(profileForm: FormGroup) {
    if (!this.getUser()) {
      try {
        if (enviroment.mode === 'Adam') {
          return this.http
            .post(
              this.url + '/Login/Login',
              { ...profileForm, name: '1' },
              this.httpOptions
            )
            .subscribe((response: LoggedUser) => {
              if (!!response) {
                localStorage.setItem('id', response.id.toString());
                localStorage.setItem('email', response.email);
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role.toString());
                localStorage.setItem('name', response.name);
                this.token = response.token;
                this.loggedInSubject.next({
                  isLoggedIn: true,
                  userRole: localStorage.getItem('role'),
                });
                this.loggedInProfile.next({
                  id: response.id,
                  name: response.name,
                  email: response.email,
                  token: response.token,
                  role: response.role,
                });
                this.router.navigate(['home']);
                return this.toast.success(
                  response.message + 'Autentificat cu succes'
                );
              } else {
                localStorage.clear();
                return this.toast.success('Autentificarea a esuat');
              }
            });
        } else {
          localStorage.setItem('id', '1');
          localStorage.setItem('email', 'string@string1.com');
          localStorage.setItem(
            'token',
            'askdnq9uweh2938ey2hsdnkbfsiug2873uhevfbjsd'
          );
          localStorage.setItem('role', '0');
          localStorage.setItem('name', 'Alex');
          this.loggedInSubject.next({
            isLoggedIn: true,
            userRole: localStorage.getItem('role'),
          });
          this.router.navigate(['home']);
          return this.toast.success('200' + 'Autentificat cu succes');
        }
      } catch (error) {
        return this.toast.error(error);
      }
    } else {
      return this.toast.error('Trebuie sa te autentifici!');
    }
  }

  getUser(): any {
    return !!localStorage.getItem('id') &&
      !!localStorage.getItem('name') &&
      !!localStorage.getItem('email') &&
      !!localStorage.getItem('token') &&
      !!localStorage.getItem('role')
      ? true
      : false;
  }

  getLoggedInUser(): Observable<UsersModels> {
    return this.loggedInProfile.asObservable();
  }

  isLogged(): Observable<{ isLoggedIn: boolean; userRole: string }> {
    const user = this.getUser();
    if (user && enviroment.mode === 'Adam') {
      this.http
        .post(
          this.url + '/Login/ValidatetToken',
          {
            token: localStorage.getItem('token'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
          },
          this.httpOptions
        )
        .subscribe((r) => {
          return this.loggedInSubject.next({
            isLoggedIn: !!r,
            userRole: localStorage.getItem('role') || '',
          });
        });
    } else {
      this.loggedInSubject.next(this.loggedInSubject.getValue());
    }

    return this.loggedInSubject.asObservable();
  }

  logOut() {
    if (this.getUser()) {
      localStorage.clear();
      this.loggedInSubject.next({
        isLoggedIn: false,
        userRole: '',
      });

      this.router.navigate(['login']);
    } else {
      this.router.navigate(['register']);
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
