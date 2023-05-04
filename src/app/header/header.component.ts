import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged!: boolean;
  constructor(private loginService: LoginService) {}
  ngOnInit() {
    this.isLogged = this.loginService.isLogged();
  }
  logout() {
    this.isLogged = this.loginService.isLogged();
    this.loginService.logOut();

  }
}
