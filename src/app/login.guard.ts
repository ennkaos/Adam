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
    const role: string = localStorage.getItem('role');
    const expectedRole: any[] = route.data['expectedRole'];
    if (!!this.loginService.getUser() && expectedRole.some((e) => (e = role))) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
