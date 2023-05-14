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

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isLogged: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const role: string = localStorage.getItem('role');
    // const expectedRole = route.data['expectedRole'];
    // this.loginService.isLogged().subscribe((e) => {
    //   this.isLogged = e;
    //   console.log(e);
    // });
    // console.log(this.isLogged);
    // if (this.isLogged || role === expectedRole) {
    //   return true;
    // } else {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    return true;
  }
}
