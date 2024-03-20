import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { AuthResponse } from '../types';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly loginUrl = `${environment.apiUrl}login/`;
  private readonly registerUrl =  `${environment.apiUrl}register/`;
  private readonly refreshUrl =  `${environment.apiUrl}refresh/`;

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, { email, password });
  }
  
  register(email: string, password: string, username: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, { email, password, username });
  }
  
  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.refreshUrl, {});
  }
}