import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiState, Post } from "../store/state/api.state";
import { Observable } from "rxjs";
import { environment } from "../environment/environment";

@Injectable({providedIn: 'root'})
export class ApiService {

  private readonly baseUrl = `${environment.apiUrl}`

  constructor(
    private http: HttpClient,
  ) {}
  
  load<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  post<T>(endpoint: string, payload: Post): Observable<T> {
    return this.http.post<T>(endpoint, payload);
  }

  
}