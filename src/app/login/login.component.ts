import { group } from '@angular/animations';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login.service';
import { UsersModels } from '../models/UsersModels';
import { ActivatedRoute, Router } from '@angular/router';
import { createPasswordStrengthValidator } from '../validators/validate-password';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isAdmin!: boolean;
  accountName!: string;
  accountType!: string;
  form!: FormGroup;
  submitted = false;
  router!: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public route: Router,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.isAdmin = true;

    this.form =
      this.route.url === '/login'
        ? this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
          })
        : this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: [
              '',
              [
                Validators.required,
                Validators.minLength(4),
                createPasswordStrengthValidator(),
              ],
            ],
          });
  }
  get f() {
    return this.form.controls;
  }
  onSumbit(form: FormGroup) {
    this.submitted = true;
    console.log(form.value);
    if (this.form.invalid) return this.toast.error('Autentificarea a esuat');
    return this.loginService.loginRequest(this.form.value);
  }
  onRegister(form: FormGroup) {
    this.submitted = true;
    console.log(form.value);
    if (this.form.invalid) return this.toast.error('Inregistrarea a esuat');
    return this.loginService.register(this.form);
  }
}
