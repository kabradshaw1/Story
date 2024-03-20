import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import * as ApiActions from "../actions/api.actions";
@Injectable()
export class ApiEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}

  get$ = createEffect(() => {
    
  });

  post$ = createEffect(() => {

  })

  delete$ = createEffect(() => {

  })

  put$ = createEffect(() => {

  })
  private handleError() {
    return (error: string, endpoint: string) => {
      return of(ApiActions.apiFailure({
        endpoint: endpoint,
        message: error
      }))
    }
  }
}