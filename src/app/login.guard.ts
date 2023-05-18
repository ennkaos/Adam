import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { enviroment } from 'src/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (enviroment.mode === 'Adam') {
      const role: string = localStorage.getItem('role');
      const expectedRole = route.data['expectedRole'];

      return !!this.loginService.getUser() && role == expectedRole;
    } else {
      return true;
    }
  }
}
