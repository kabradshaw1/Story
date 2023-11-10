import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import AppState from 'src/app/store/state/app.state';
import { selectAuthError } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
      }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    };

  error$ = this.store.select(selectAuthError);

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { email, password, username } = this.registerForm.value
    console.log(email, password, username)
    this.store.dispatch(AuthActions.register({ email, password, username }))
  }
}
