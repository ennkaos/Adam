import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable, Subscription, of } from 'rxjs';
import { ActiveToast } from 'ngx-toastr';
import { Role } from '../models/roles';
import { UsersModels } from '../models/UsersModels';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged$: Observable<UsersModels>;
  logged: UsersModels;
  subscription: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogged();
    this.subscription = this.isLogged$.subscribe((e) => {
      console.log('Logged in State', e);
      this.logged = e;
    });
  }

  logout() {
    this.loginService.logOut();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
