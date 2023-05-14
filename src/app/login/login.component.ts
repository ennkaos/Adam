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
    public route: Router
  ) {}
  ngOnInit(): void {
    this.isAdmin = true;

    this.form =
      this.route.url === '/login'
        ? this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
          })
        : this.fb.group(
            {
              name: ['', [Validators.required]],
              email: ['', [Validators.required, Validators.email]],
              password: ['', [Validators.required, Validators.minLength(4)]],
              confirmPassword: [
                '',
                [Validators.required, Validators.minLength(4)],
              ],
            },
            {
              validators: MustMatch('password', 'confirmPassword'),
            }
          );
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(form: FormGroup) {
    this.submitted = true;
    console.log(form);
    if (this.form.invalid) return;
    const email = this.form.value.email;
    const password = this.form.value.password;

    console.log(this.form.value);

    this.loginService.loginRequest(this.form.value);
  }
}
function MustMatch(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}
