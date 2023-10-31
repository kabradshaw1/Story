import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { AuthEffects } from "./auth.effects";
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from "../../services/auth.service";
import { cold, hot } from 'jasmine-marbles';
import { Router } from "@angular/router";

describe('AuthEffect', () => {
  let effects: AuthEffects;
  let actions$: Observable<Action>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login', 'register'])
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
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
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('givenLoginAction_whenServiceFails_thenDispatchAuthFailure', () => {
      const credentials = { email: 'test@email.com', password: 'password123' };
      const action = AuthActions.login(credentials);
      const completion = AuthActions.authFailure({ error: 'Failed' });

      actions$ = hot('-a', { a: action });
      authService.login.and.returnValue(throwError(() => new Error('Failed')));

      const expected = cold('-c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
    });

    it('givenLoginAction_whenErrorReturned_thenDispatchAuthService', () => {
      const credentials = { email: 'test@email.com', password: 'password123' };
      const action = AuthActions.login(credentials);
      const completion = AuthActions.authFailure({ error: 'testError' });

      actions$ = hot('-a', { a: action });
      authService.login.and.returnValue(cold('-b', { b: { error: 'testError' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
    });

    it('givenLoginAction_whenNoErrorOrKeyReturned_thenDispatchUnknownError', () => {
      const credentials = { email: 'test@email.com', password: 'password123' };
      const action = AuthActions.login(credentials);
      const completion = AuthActions.authFailure({ error: "An unknown error occurred. Please try again." });

      actions$ = hot('-a', { a: action });
      // Simulate a response that has neither accessToken nor error.
      authService.login.and.returnValue(cold('-b', { b: {} }));

      const expected = cold('--c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
    });

  });

  describe('register$', () => {
    it('givenRegisterAction_whenServiceSucceeds_thenDispatchAuthServiceAndRoute', () => {
      const credentials = { email: 'test@example.com', password:'testpass', username: 'tester' };
      const action = AuthActions.register(credentials);
      const completion = AuthActions.authSuccess({ accessToken: 'testToken' });

      actions$ = hot('-a', { a: action });
      authService.register.and.returnValue(cold('-b', { b: { accessToken: 'testToken' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.register$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('givenRegisterAction_whenServiceFails_thenDispatchAuthFailure', () => {
      const credentials = { email: 'test@email.com', password: 'password123', username: 'tester' };
      const action = AuthActions.register(credentials);
      const completion = AuthActions.authFailure({ error: 'Failed' });

      actions$ = hot('-a', { a: action });
      authService.register.and.returnValue(throwError(() => new Error('Failed')));

      const expected = cold('-c', { c: completion });

      expect(effects.register$).toBeObservable(expected);
    });
  });
});