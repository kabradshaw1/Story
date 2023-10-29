import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { AuthEffects } from "./auth.effects";
import * as AuthAction from '../actions/auth.actions';
import { AuthService } from "src/app/services/auth.service";
import { cold, hot } from 'jasmine-marbles';

describe('AuthEffect', () => {
  let effects: AuthEffects;
  let actions$: Observable<Action>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login'])
        }
      ]
    });
  });
});