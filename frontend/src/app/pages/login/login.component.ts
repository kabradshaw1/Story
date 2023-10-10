import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]]
    });
  }

  onSubmit() {
    this.loading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
  }
}
