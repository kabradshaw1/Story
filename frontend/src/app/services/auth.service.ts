import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';

interface SuccessResponse {
  accessToken: string;
}

interface ErrorResponse {
  status: number;
  error: string;
}

interface AppState {
  auth: { accessToken: string | null }
}

type LoginResponse = SuccessResponse | ErrorResponse;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly loginUrl = `${environment.apiUrl}login/`;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  login(password: string, email: string): Observable<LoginResponse> {
    const credentials = { email, password };

    return this.http.post<LoginResponse>(this.loginUrl, credentials)
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
  }
}

function isSuccessResponse(response: LoginResponse): response is SuccessResponse {
  return (response as SuccessResponse).accessToken !== undefined;
}

