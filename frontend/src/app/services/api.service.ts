import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiState, Post } from "../store/state/api.state";
import { Observable, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(
    private http: HttpClient,
    private store: Store<ApiState> 
  ) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(endpoint)
      .pipe(
        tap(response => {
          this.store.dispatch({
            type: ''
            payload: 
          })
        })
      );
  }

  post<T>(endpoint: string, payload: Post): Observable<T> {
    return this.http.post<T>(endpoint, payload);
  }

  
}