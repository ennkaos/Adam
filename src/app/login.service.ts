import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { UsersModels } from './models/UsersModels';
import { FormGroup } from '@angular/forms';
import { LoggedUser } from './models/LoggedUser';
import { BehaviorSubject, Observable, map, of, throwError } from 'rxjs';
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
    materie: localStorage.getItem('materie'),
    serie: localStorage.getItem('serie'),
    grupa: localStorage.getItem('grupa'),
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
              if (response.role === 1 && !!response.materie)
                localStorage.setItem('materie', response.materie);

              if (response.role === 2 && !!response.serie && !!response.grupa) {
                localStorage.setItem('serie', response.serie);
                localStorage.setItem('grupa', response.grupa);
              }

              this.token = response.token;
              this.loggedInSubject.next({
                id: response.id,
                isLoggedIn: true,
                token: response.token,
                name: response.name,
                email: response.email,
                role: Number(localStorage.getItem('role')),
                materie: localStorage.getItem('materie'),
                serie: localStorage.getItem('serie'),
                grupa: localStorage.getItem('grupa'),
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
    try {
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

      return this.loggedInSubject.asObservable();
    } catch (error) {
      this.toast.error('Tokenul a expirat');
      this.router.navigate(['login']);
      return error;
    }
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
