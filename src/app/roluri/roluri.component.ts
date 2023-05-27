import { Component } from '@angular/core';
import { UsersModels } from '../models/UsersModels';
import { Observable, Subject, forkJoin } from 'rxjs';
import { RoluriService } from './services/roluri.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roluri',
  templateUrl: './roluri.component.html',
  styleUrls: ['./roluri.component.css'],
})
export class RoluriComponent {
  users$!: Observable<UsersModels[]>;
  user$!: Observable<UsersModels>;
  usersResult!: UsersModels[];
  sortResult: Subject<UsersModels[]> = new Subject();
  initialData: any[];
  showPassword: boolean = false;
  constructor(
    public usersService: RoluriService,
    public loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role === '0') {
      this.users$ = this.usersService.getUsers();
      this.users$.subscribe((e) => {
        console.log('Subscription Started ...');
        console.log(e);

        this.usersResult = e;
        this.initialData = e;
      });
    } else {
      this.user$ = this.loginService.getLoggedInUser();
      this.user$.subscribe((e) => {
        this.usersResult.push({
          name: e.name,
          isLoggedIn: true,
          email: e.email,
          token: e.token,
          role: e.role,
        });
      });
      this.router.navigate(['roluri/details/' + localStorage.getItem('id')]);
    }
  }
  showPasswordClick() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
  sort($event) {
    this.usersResult = $event;
  }
  filter($event) {
    if ($event) {
      this.usersResult = $event;
    } else {
      this.usersResult = this.initialData;
    }
  }

  delete(id: number): void {
    try {
      this.usersService.deleteUser(id);
      this.usersResult = this.usersResult.filter((e) => e.id !== id);
      this.initialData = this.initialData.filter((e) => e.id !== id);
    } catch (error) {
      this.toastr.error('Ceva a mers gresit ..');
      throw error;
    }
  }
}
