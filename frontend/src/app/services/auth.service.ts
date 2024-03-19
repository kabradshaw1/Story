import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { AuthResponse, SuccessResponse } from '../types';
import AppState from '../store/state/app.state';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly loginUrl = `${environment.apiUrl}login/`;
  private readonly registerUrl =  `${environment.apiUrl}register/`;
  private readonly refreshUrl =  `${environment.apiUrl}refresh/`;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  login(email: string, password: string): Observable<AuthResponse> {
    const credentials = { email, password };
    return this.http.post<AuthResponse>(this.loginUrl, credentials)
      .pipe(
        tap(response => {
          if (isSuccessResponse(response)) {
            this.store.dispatch({
              type: '[Auth] Success',
              payload: response.accessToken
            });
          }
        }),
        catchError(error => {
          this.store.dispatch({ type: '[Auth] Failure', payload: error.statusText });
          return throwError(() => error);
        })
      );
  };

  register(email: string, password: string, username: string): Observable<AuthResponse> {
    const credentials = { email, password, username };

    return this.http.post<AuthResponse>(this.registerUrl, credentials)
      .pipe(
        tap(response => {
          console.log(credentials)
          if (isSuccessResponse(response)) {
            this.store.dispatch({
              type: '[Auth] Success',
              payload: response.accessToken
            });
          }
        }),
        catchError(error => {
          this.store.dispatch({ type: '[Auth] Failure', payload: error.statusText });
          return throwError(() => error);
        })
      );
  }

  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.refreshUrl, {})
      .pipe(
        tap(response => {
          if (isSuccessResponse(response))
            this.store.dispatch({
              type: '[Auth] Success',
              payload: response.accessToken
            })
        }),
        catchError(error => {
          this.store.dispatch({ type: '[Auth] Failure', payload: error.statusText });
          return throwError(() => error);
        })
      )
  }
}

function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  return (response as SuccessResponse).accessToken !== undefined;
}

