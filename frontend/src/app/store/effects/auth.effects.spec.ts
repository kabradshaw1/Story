import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { AuthEffects } from "./auth.effects";
import * as AuthActions from '../actions/auth.actions';
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
    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
  });

  describe('login$', () => {
    it('givenLoginAction_whenServiceSucceeds_thenDispatchAuthService', () => {
      const credentials = { email: 'test@email.com', password: 'password123' };
      const action = AuthActions.login(credentials);
      const completion = AuthActions.authSuccess({ accessToken: 'testToken' });

      actions$ = hot('-a', { a: action });
      authService.login.and.returnValue(cold('-b', { b: { accessToken: 'testToken' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
    });
  })
  // authService.login.and.returnValue(throwError(() => Error('Failed')));
});