import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, of } from 'rxjs';
import { LoginService } from 'src/app/login.service';
import { MateriiService } from 'src/app/materii/services/materii.service';
import { MateriiModel } from 'src/app/models/MateriiModel';
import { UsersModels } from 'src/app/models/UsersModels';
import { RoluriService } from '../services/roluri.service';
import { LoggedUser } from 'src/app/models/LoggedUser';

@Component({
  selector: 'app-roluri-details',
  templateUrl: './roluri-details.component.html',
  styleUrls: ['./roluri-details.component.css'],
})
export class RoluriDetailsComponent {
  user$: Observable<UsersModels> = new Observable<UsersModels>();
  router!: string | undefined;
  profileForm!: FormGroup;
  editable: boolean;
  userResult!: UsersModels;
  userId!: null | string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private roluriService: RoluriService,
    private toastr: ToastrService,
    private router2: Router
  ) {}
  ngOnInit() {
    this.router = this.route.snapshot.url.shift()?.path;
    this.userId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;

    this.profileForm =
      localStorage.getItem('role') && localStorage.getItem('role') === '0'
        ? this.fb.group({
            id: [''],
            name: [''],
            email: ['', Validators.email],
            role: [1],
          })
        : this.fb.group({
            id: [''],
            name: [''],
            email: ['', Validators.email],
            password: [''],
          });
    if (this.router === 'details') {
      this.profileForm.disable();
      this.editable = false;
    } else {
      this.editable = true;
    }

    this.user$ = this.roluriService.getUser(Number(this.userId));
    this.user$.subscribe((e) => {
      this.userResult = e;
      if (
        localStorage.getItem('role') &&
        localStorage.getItem('role') === '0'
      ) {
        this.profileForm.controls['id'].setValue(this.userId);
        this.profileForm.controls['name'].setValue(this.userResult.name);
        this.profileForm.controls['email'].setValue(this.userResult.email);
        this.profileForm.controls['role'].setValue(this.userResult.role);
      } else {
        this.profileForm.controls['id'].setValue(this.userId);
        this.profileForm.controls['name'].setValue(this.userResult.name);
        this.profileForm.controls['email'].setValue(this.userResult.email);
        this.profileForm.controls['password'].setValue(
          this.userResult.password
        );
      }
    });
  }
  onSubmit() {}
  onReset() {}
}
