import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  loginForm: FormGroup;
  message = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]]
    });
    }


  onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return Promise.resolve();

    this.loading = true;
    const { email, password } = this.loginForm.value;

    return new Promise((resolve) => {
      this.authService.login(email, password).subscribe({
        next: () => resolve(),
        error: (err) => {
          this.loading = false;
          this.message = err?.error?.message === 'Invalid credentials.'
            ? 'Invalid credentials.'
            : 'An error occurred during login. Please try again.';
          resolve();
        }
      });
    });
  }

}
