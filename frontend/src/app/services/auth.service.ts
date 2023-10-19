import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { AuthState } from '../store/state/auth.state';

interface SuccessResponse {
  accessToken: string;
}

interface ErrorResponse {
  status: number;
  error: string;
}

type AuthResponse = SuccessResponse | ErrorResponse;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly loginUrl = `${environment.apiUrl}login/`;
  private readonly registerUrl =  `${environment.apiUrl}register/`;
  private readonly refreshUrl =  `${environment.apiUrl}refresh/`;

  constructor(
    private http: HttpClient,
    private store: Store<AuthState>
  ) { }

  login(password: string, email: string): Observable<AuthResponse> {
    const credentials = { email, password };

    return this.http.post<AuthResponse>(this.loginUrl, credentials)
      .pipe(
        tap(response => {
          if (isSuccessResponse(response)) {
            this.store.dispatch({
              type: '[Auth] Login Success',
              payload: response.accessToken
            });
          }
        }),
        catchError(error => {
          this.store.dispatch({ type: '[Auth] Login Failure', payload: error.statusText });
          return throwError(() => error);
        })
      );
  };

  register(password: string, email: string, username: string): Observable<AuthResponse> {
    const credentials = { email, password, username }
    return this.http.post<AuthResponse>(this.registerUrl, credentials)
      .pipe(
        tap(response => {
          if (isSuccessResponse(response)) {
            this.store.dispatch({
              type: '[Auth] Register Success',
              payload: response.accessToken
            });
          }
        }),
        catchError(error => {
          this.store.dispatch({ type: '[Auth] Register Failure', payload: error.statusText });
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
              type: '[Auth] Refresh Success',
              payload: response.accessToken
            })
        }),
        catchError(error => {
          this.store.dispatch({ type: '[Auth] Refresh Failure', payload: error.statusText });
          return throwError(() => error);
        })
      )
  }
}

function isSuccessResponse(response: AuthResponse): response is SuccessResponse {
  return (response as SuccessResponse).accessToken !== undefined;
}

