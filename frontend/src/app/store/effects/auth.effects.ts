import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AuthResponse } from "src/app/types";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map((response: AuthResponse) => {
            if ('accessToken' in response) {
              this.router.navigate(['/home']);
              return AuthActions.authSuccess({ accessToken: response.accessToken });
            } else if ('error' in response) {
              return AuthActions.authFailure({ error: response.error });
            } else {
              // No token and no specific error message.
              return AuthActions.authFailure({ error: "An unknown error occurred. Please try again." });
            }
          }),
          catchError(error => {
            // This handles the scenario when the service call fails outright.
            return of(AuthActions.authFailure({ error: error.message || "An unknown error occurred." }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authService.register(action.email, action.password, action.username).pipe(
          map((response: AuthResponse) => {
            if ('accessToken' in response) {
              this.router.navigate(['/home']);
              return AuthActions.authSuccess({ accessToken: response.accessToken });
            } else if ('error' in response) {
              return AuthActions.authFailure({ error: response.error });
            } else {
              // No token and no specific error message.
              return AuthActions.authFailure({ error: "An unknown error occurred. Please try again." });
            }
          }),
          catchError(error => {
            // This handles the scenario when the service call fails outright.
            return of(AuthActions.authFailure({ error: error.message || "An unknown error occurred." }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}