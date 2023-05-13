import { ErrorHandler, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  loginRequest(user: string, pass: string) {
    if (user && pass) {
      this.router.navigate(['/home']);
      localStorage.setItem('user', user);
      localStorage.setItem('pass', pass);
    } else {
    }
  }
  isLogged(): boolean {
    if (
      localStorage.getItem('user') !== null &&
      localStorage.getItem('pass') !== null
    ) {
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
}
