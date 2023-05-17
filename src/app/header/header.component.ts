import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable, Subscription, of } from 'rxjs';
import { ActiveToast } from 'ngx-toastr';
import { Role } from '../models/roles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged$: Observable<{ isLoggedIn: boolean; userRole: string }>;
  logged: { isLoggedIn: boolean; userRole: string };

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogged();
    this.isLogged$.subscribe((e) => {
      console.log('Logged in State', e);
      this.logged = e;
    });
  }

  logout() {
    this.loginService.logOut();
  }
}
