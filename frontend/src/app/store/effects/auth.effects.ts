import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { Observable, catchError, map, mergeMap, of } from "rxjs";
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
          this.handleAuthResponse(),
          catchError(this.handleError())
        )
      )
    )
  );

  private handleAuthResponse() {
    return (source$: Observable<AuthResponse>) => source$.pipe(
      map(response => {
        if ('accessToken' in response) {
          this.router.navigate(['/home']);
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

}
