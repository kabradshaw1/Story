import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiState } from "../store/state/api.state";

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(
    private http: HttpClient,
    private store: Store<ApiState> 
  ) {}
}