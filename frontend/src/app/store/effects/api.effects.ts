import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { ApiService } from "src/app/services/api.service";

@Injectable()
export class ApiEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
    ) {}

}