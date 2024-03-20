import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import * as ApiActions from "../actions/api.actions";
@Injectable()
export class ApiEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}

  load$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ApiActions.apiLoad),
      mergeMap(action =>
        this.apiService.load(action.endpoint).pipe(
          map(data => ApiActions.apiSuccess({ endpoint: action.endpoint, data })),
          catchError(error => of(ApiActions.apiFailure({endpoint: action.endpoint, message: error.message})))
        )
      )
    )
  );

  // get$ = createEffect(() => {
    
  // });

  // post$ = createEffect(() => {

  // });

  // delete$ = createEffect(() => {

  // });

  // put$ = createEffect(() => {

  // });
}