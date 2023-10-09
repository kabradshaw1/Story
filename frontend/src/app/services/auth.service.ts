import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

interface SuccessResponse {
  accessToken: string;
}

interface ErrorResponse {
  status: number;
  error: string;
}

type LoginResponse = SuccessResponse | ErrorResponse;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly loginUrl = 'http://localhost:8080/api/login/';

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  login(password: string, email: string): Observable<LoginResponse> {
    const credentials = { email, password };

    return this.http.post(this.loginUrl, credentials)
      .pipe(
        tap(response => {
          this.store.dispatch({
            type: '[Auth] Login Success',
            payload: response.accessToken
          })
        })
      )
  }
}
