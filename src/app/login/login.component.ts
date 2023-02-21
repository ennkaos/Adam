import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  constructor(public fb: FormBuilder) {}
  ngOnInit(): void {
    this.isAdmin = true;

    this.form = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  async onSubmit(value: boolean) {
    const email = this.form.value.email;
    const password = this.form.value.password;
    //@TODO LOGIC and SERVICE for LOGIN
  }
}
