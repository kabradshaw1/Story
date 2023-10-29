import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AuthResponse } from "src/app/types";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
          this.authService.login(action.email, action.password).pipe(
            map((response: AuthResponse) => {
              if ('accessToken' in response) {
                return AuthActions.authSuccess({ accessToken: response.accessToken });
              } else {
                // This can be enhanced to handle error scenarios better.
                return AuthActions.authFailure({ error: response.error });
              }
            }),
            catchError(error => of(AuthActions.authFailure({ error: error.message})))
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}