import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cereri } from '../models/Cereri';
import { RequestsService } from './services/requests.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent {
  updateStatus(arg0: number) {
    throw new Error('Method not implemented.');
  }
  delete(arg0: number) {
    throw new Error('Method not implemented.');
  }
  cereri$!: Observable<Cereri[]>;
  role: string;
  name: string;
  email: string;
  cereriResult!: Cereri[];
  sortResult: Subject<Cereri[]> = new Subject();
  initialData: any[];
  constructor(
    public requestsService: RequestsService,
    public loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.cereri$ =
      this.role === '0'
        ? this.requestsService.getCereri()
        : this.requestsService.getCereriByEmail(this.email);
    this.cereri$.subscribe((cereri) => {
      this.cereriResult = cereri;
      this.initialData = cereri;
    });
  }

  sort($event) {
    this.cereriResult = $event;
  }
  filter($event) {
    if ($event) {
      this.cereriResult = $event;
    } else {
      this.cereriResult = this.initialData;
    }
  }
}
