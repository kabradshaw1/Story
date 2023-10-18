import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
      })
    }

  onSubmit(): Promise<void> {
    if (this.registerForm.invalid) return Promise.resolve();

    this.loading = true;
    const { email, password, username } = this.registerForm.value;

    return new Promise((resolve) => {
      this.authService.register(email, username, password).subscribe({
        next: () => resolve(),
        error: (err) => {
          this.loading = false;
          if (err && err.error && err.error.message) {
            if(err.error.message.includes("Email already registered")) {
              this.message = err.error.message;
            } else if (err.error.message.includes("Username already registered")) {
              this.message = err.error.message;
            } else {
              this.message = 'An error occurred during registration. Please try again.';
            }
          } else {
            this.message = 'An error occurred during registration. Please try again.';
          }
          resolve();
        }
      })
    })
  }
}
