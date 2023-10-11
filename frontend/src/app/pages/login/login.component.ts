import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService

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

    this.authService.login(email, password).subscribe({
      next: (response) => {
        // Handle successful login here, e.g., navigate to another route or set user data
        this.message = 'Login successful';
      },
      error: (err) => {
        // Handle errors here based on the error response
        this.loading = false; // Hide loading spinner

        // You can have more specific error messages based on the type of error
        if (err?.error?.message === 'Invalid credentials') {
          this.message = 'Invalid Credentials';
        } else {
          this.message = 'An error occurred during login. Please try again.';
        }
      }
    });
}

}
