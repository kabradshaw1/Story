import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AuthResponse } from "src/app/types";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map(response => this.handleAuthResponse(response)),
          catchError(error => of(this.handleError(error)))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.authService.register(action.email, action.password, action.username).pipe(
          map(response => this.handleAuthResponse(response)),
          catchError(error => of(this.handleError(error)))
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refresh),
      mergeMap(() =>
        this.authService.refresh().pipe(
          map(response => this.handleAuthResponse(response)),
          catchError(error => of(this.handleError(error)))
        )
      )
    )
  );

  private handleAuthResponse(response: AuthResponse) {
    if ('accessToken' in response) {
      this.router.navigate(['/']);
      return AuthActions.authSuccess({ accessToken: response.accessToken });
    } else {
      this.router.navigate(['/login']);
      return AuthActions.authFailure({ error: response.error || "An unknown error occurred. Please try again." });
    }
  }

  private handleError(error: any) {
    this.router.navigate(['/login']);
    return AuthActions.authFailure({ error: error.message || "An unknown error occurred." });
  }
}
