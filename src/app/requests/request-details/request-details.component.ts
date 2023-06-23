import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, of } from 'rxjs';
import { Cereri } from 'src/app/models/Cereri';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css'],
})
export class RequestDetailsComponent {
  submitted: boolean;
  requests$: Observable<Cereri> = new Observable<Cereri>();
  router!: string | undefined;
  userEmail: string;
  userRole: string;
  editable!: boolean;
  profileForm!: FormGroup;
  requestsResult!: Cereri;
  requestsId!: null | string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private routerNav: Router
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email');
    this.userRole = localStorage.getItem('role');
    this.router = this.route.snapshot.url.shift()?.path;
    this.requestsId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;

    this.profileForm =
      this.router === 'create'
        ? this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            cerere: ['', Validators.required],
            requestState: [0, Validators.required],
          })
        : this.fb.group({
            id: [1, Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.required],
            cerere: ['', Validators.required],
            requestState: [0, Validators.required],
          });
    if (this.router === 'details') {
      this.profileForm.disable();
      this.editable = false;
      this.requests$ = this.requestsService.getRequestById(
        Number(this.requestsId)
      );
      this.requests$.subscribe((e) => {
        this.requestsResult = e;
        this.profileForm.controls['id'].setValue(this.requestsId);
        this.profileForm.controls['name'].setValue(this.requestsResult.name);
        this.profileForm.controls['email'].setValue(this.requestsResult.email);
        this.profileForm.controls['cerere'].setValue(
          this.requestsResult.cerere
        );
        this.profileForm.controls['requestState'].setValue(
          this.requestsResult.requestState
        );
      });
    } else {
      this.requests$ = of({
        id: 1,
        name: '',
        email: '',
        cerere: '',
        requestState: 0,
      });
      this.editable = true;
      this.requests$.subscribe();
    }
  }
  onSubmit() {
    this.submitted = true;
    if (
      !this.profileForm.controls['name'].errors &&
      !this.profileForm.controls['cerere'].errors
    ) {
      this.profileForm.controls['email'].setValue(this.userEmail);
      this.profileForm.controls['requestState'].setValue(0);
      this.requestsService.createRequest(this.profileForm.value);
      this.routerNav.navigate(['requests']);
    } else {
      this.toastr.warning(
        'Pentru a face crea o cerere trebuie sa introduci datele!'
      );
    }
  }
  onReset() {}
}
