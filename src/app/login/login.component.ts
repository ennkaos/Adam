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
  form!: FormGroup;

  constructor(public fb: FormBuilder, private loginService: LoginService) {}
  ngOnInit(): void {
    this.isAdmin = true;

    this.form = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  onSubmit() {
    console.log('asd');
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.loginService.loginRequest(email, password);
  }
}
