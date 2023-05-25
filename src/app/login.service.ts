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
  loggedInSubject: BehaviorSubject<UsersModels> = new BehaviorSubject({
    isLoggedIn: true,
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
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
                  id: response.id,
                  isLoggedIn: true,
                  token: response.token,
                  name: response.name,
                  email: response.email,
                  role: Number(localStorage.getItem('role')),
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
          localStorage.setItem('name', 'Alex');
          localStorage.setItem('role', '0');
          const id: number = Number(localStorage.getItem('id'));
          const email: string = localStorage.getItem('email');
          const token: string = localStorage.getItem('token');
          const role: number = Number(localStorage.getItem('role'));
          const name: string = localStorage.getItem('name');
          this.loggedInSubject.next({
            id: id,
            isLoggedIn: true,
            token: token,
            name: name,
            email: email,
            role: Number(role),
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
    return this.loggedInSubject.asObservable();
  }

  isLogged(): Observable<UsersModels> {
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
            id: Number(localStorage.getItem('id')),
            isLoggedIn: !!r,
            token: localStorage.getItem('token'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            role: Number(localStorage.getItem('role')),
          });
        });
    } else {
      this.loggedInSubject.next({
        id: Number(localStorage.getItem('id')),
        isLoggedIn: true,
        token: localStorage.getItem('token'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        role: Number(localStorage.getItem('role')),
      });
    }

    return this.loggedInSubject.asObservable();
  }

  logOut() {
    if (this.getUser()) {
      localStorage.clear();
      this.loggedInSubject.next({
        id: 0,
        isLoggedIn: false,
        token: '',
        name: '',
        email: '',
        role: 0,
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
