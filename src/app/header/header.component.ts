import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged: boolean = false;
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.isLogged().subscribe((e) => {
      this.isLogged = e;
    });
  }
  logout() {
    this.loginService.logOut();
  }
}
