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

  load<Post>(endpoint: string): Observable<Post> {
    return this.http.get<Post>(endpoint)
      .pipe(
        tap(response => {
          this.store.dispatch({
            type: ''
            // payload: resp
          })
        })
      );
  }

  post<T>(endpoint: string, payload: Post): Observable<T> {
    return this.http.post<T>(endpoint, payload);
  }

  
}