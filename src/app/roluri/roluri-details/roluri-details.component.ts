import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from 'src/app/login.service';
import { UsersModels } from 'src/app/models/UsersModels';
import { RoluriService } from '../services/roluri.service';
import { Role } from 'src/app/models/roles';
import { Roles } from 'src/app/models/scheduleModel';

@Component({
  selector: 'app-roluri-details',
  templateUrl: './roluri-details.component.html',
  styleUrls: ['./roluri-details.component.css'],
})
export class RoluriDetailsComponent {
  user$: Observable<UsersModels> = new Observable<UsersModels>();
  router!: string | undefined;
  subscription: Subscription;
  profileForm!: FormGroup;
  editable: boolean = false;
  roles: Role[];
  userResult!: UsersModels;
  userId!: null | string;
  userRole: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private roluriService: RoluriService,
    private toastr: ToastrService,
    private router2: Router
  ) {
    this.roles = Roles;
  }
  ngOnInit() {
    this.editable = false;
    this.userRole = localStorage.getItem('role');
    this.router = this.route.snapshot.url.shift()?.path;
    this.userId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;

    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.maxLength(20)],
      email: ['', Validators.email],
      password: ['', Validators.maxLength(20)],
      role: [1],
    });
    this.profileForm.disable();
    this.user$ = this.roluriService.getUser(Number(this.userId));

    this.subscription = this.user$.subscribe((e) => {
      this.userResult = e;
      this.profileForm.controls['id'].setValue(this.userId);
      this.profileForm.controls['name'].setValue(this.userResult.name);
      this.profileForm.controls['email'].setValue(this.userResult.email);
      this.profileForm.controls['role'].setValue(this.userResult.role);
    });
  }

  onSubmit() {
    if (this.editable) {
      console.log(Number(this.userId), this.userResult.id);
      if (this.userId === localStorage.getItem('id')) {
        this.roluriService.updateUser(
          this.userResult.id,
          this.profileForm.value
        );
        this.router2.navigate(['home']);
        console.log('asdasd');
      } else {
        this.roluriService.updateUser(
          Number(this.userId),
          this.profileForm.value
        );
        this.router2.navigate(['roluri']);
        console.log('Secomd');
      }
    } else {
      console.log('onEdit()');
      this.profileForm.enable();
      this.editable = true;
    }
  }
  onReset() {
    if (this.userRole === '0') {
      this.roluriService.deleteUser(this.profileForm.value.id);
      this.router2.navigate(['roluri']);
    } else {
      this.roluriService.deleteUser(this.profileForm.value.id);
      this.loginService.logOut();
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
