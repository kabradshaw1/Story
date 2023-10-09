import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginUrl = 'http://localhost:8080/api/login/';

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  login(password: string, email: string) {
    const credentials = { email, password };

    this.http.post<{ accessToken: string }>(this.loginUrl, credentials)
      .subscribe(response => {
        this.store.dispatch({
          type: '[Auth] Login Success',
          payload: response.accessToken
        });
      });
  }
}
