import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isAdmin!: boolean;
  accountName!: string;
  accountType!: string;
  form!: FormGroup<any>;

  constructor(public fb: FormBuilder, private loginService: LoginService) {}
  ngOnInit(): void {
    this.isAdmin = true;

    this.form = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    console.log(this.form.value);

    this.loginService.loginRequest(email, password);
  }
}
