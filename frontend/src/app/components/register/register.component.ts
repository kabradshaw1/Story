import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
      })
    }

  error$ = this.store.select(selectAuthError);

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { email, password, username } = this.registerForm.value
    this.store.dispatch(AuthActions.register({ email, password, username }))
  }
}
