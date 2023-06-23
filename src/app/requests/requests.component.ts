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
      this.cereriResult =
        cereri.length > 0
          ? cereri.sort((a, b) =>
              a['requestState'] < b['requestState']
                ? -1
                : a['requestState'] > b['requestState']
                ? 1
                : 0
            )
          : [];
      this.initialData =
        cereri.length > 0
          ? cereri.sort((a, b) =>
              a['requestState'] < b['requestState']
                ? -1
                : a['requestState'] > b['requestState']
                ? 1
                : 0
            )
          : [];
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
  updateStatus(
    status: number,
    id: number,
    name: string,
    email: string,
    cerere: string
  ) {
    this.requestsService.update(id, {
      id,
      name,
      email,
      cerere,
      requestState: status,
    });
    this.ngOnInit();
  }
  delete(arg0: number) {
    this.requestsService.delete(arg0);
    this.cereriResult = this.cereriResult.filter(
      (cerere) => cerere.id !== arg0
    );
    this.initialData = this.initialData.filter((cerere) => cerere.id !== arg0);
  }
}
