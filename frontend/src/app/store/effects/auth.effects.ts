import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { Observable, catchError, map, mergeMap, of, tap } from "rxjs";
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
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          this.handleAuthResponse(),
          catchError(this.handleError())
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authService.register(action.email, action.password, action.username).pipe(
          tap(response=> console.log('Register response:', response)),
          this.handleAuthResponse(),
          catchError(this.handleError())
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refresh),
      mergeMap(() =>
        this.authService.refresh().pipe(
          map((response: AuthResponse) => {
            if ('accessToken' in response) {
                return AuthActions.authSuccess({ accessToken: response.accessToken });
            } else if ('error' in response) {
                this.router.navigate(['/login']);
                return AuthActions.authFailure({ error: response.error });
            } else {
                this.router.navigate(['/login']);
                return AuthActions.authFailure({ error: "An unknown error occurred. Please try again." });
            }
          }),
          catchError(error => {
            this.router.navigate(['/login']);
            return of(AuthActions.authFailure({ error: error.message || 'Error occurred while refreshing.' }));
          })
        )
      )
    )
  )

  private handleAuthResponse() {
    return (source$: Observable<AuthResponse>) => source$.pipe(
      map(response => {
        if ('accessToken' in response) {
          this.router.navigate(['/']);
          return AuthActions.authSuccess({ accessToken: response.accessToken });
        } else if ('error' in response) {
          return AuthActions.authFailure({ error: response.error });
        } else {
          return AuthActions.authFailure({ error: "An unknown error occurred. Please try again." });
        }
      })
    );
  }

  private handleError() {
    return (error: any) => {
        return of(AuthActions.authFailure({ error: error.message || "An unknown error occurred." }));
    };
  }
}
