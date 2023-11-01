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
          useValue: jasmine.createSpyObj('AuthService', ['login', 'register', 'refresh'])
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
    it('givenLoginAction_whenServiceSucceeds_thenDispatchAuthServiceAndRoute', () => {
      const credentials = { email: 'test@email.com', password: 'password123' };
      const action = AuthActions.login(credentials);
      const completion = AuthActions.authSuccess({ accessToken: 'testToken' });

      actions$ = hot('-a', { a: action });
      authService.login.and.returnValue(cold('-b', { b: { accessToken: 'testToken' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('givenLoginAction_whenServiceFails_thenDispatchError', () => {
      const credentials = { email: 'test@email.com', password: 'password123' };
      const action = AuthActions.login(credentials);
      const completion = AuthActions.authFailure({ error: 'Failed' });

      actions$ = hot('-a', { a: action });
      authService.login.and.returnValue(throwError(() => new Error('Failed')));

      const expected = cold('-c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
    });

    it('givenLoginAction_whenErrorReturned_thenDispatchError', () => {
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
    it('givenRegisterAction_whenServiceSucceeds_thenDispatchAccessTokenAndRoute', () => {
      const credentials = { email: 'test@example.com', password:'testpass', username: 'tester' };
      const action = AuthActions.register(credentials);
      const completion = AuthActions.authSuccess({ accessToken: 'testToken' });

      actions$ = hot('-a', { a: action });
      authService.register.and.returnValue(cold('-b', { b: { accessToken: 'testToken' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.register$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('givenRegisterAction_whenServiceFails_thenDispatchError', () => {
      const credentials = { email: 'test@email.com', password: 'password123', username: 'tester' };
      const action = AuthActions.register(credentials);
      const completion = AuthActions.authFailure({ error: 'Failed' });

      actions$ = hot('-a', { a: action });
      authService.register.and.returnValue(throwError(() => new Error('Failed')));

      const expected = cold('-c', { c: completion });

      expect(effects.register$).toBeObservable(expected);
    });

    it('givenRegisterAction_whenErrorReturned_thenDispatchError', () => {
      const credentials = { email: 'test@email.com', password: 'password123', username: 'Tester' };
      const action = AuthActions.register(credentials);
      const completion = AuthActions.authFailure({ error: 'testError' });

      actions$ = hot('-a', { a: action });
      authService.register.and.returnValue(cold('-b', { b: { error: 'testError' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.register$).toBeObservable(expected);
    });

    it('givenRegisterAction_whenNoErrorOrKeyReturned_thenDispatchUnknownError', () => {
      const credentials = { email: 'test@email.com', password: 'password123', username: 'Tester' };
      const action = AuthActions.register(credentials);
      const completion = AuthActions.authFailure({ error: "An unknown error occurred. Please try again." });

      actions$ = hot('-a', { a: action });
      // Simulate a response that has neither accessToken nor error.
      authService.register.and.returnValue(cold('-b', { b: {} }));

      const expected = cold('--c', { c: completion });

      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('refresh$', () => {
    it('givenRefreshAction_whenServiceSuccessful_thenDispatchAccessToken', () => {
      const action = AuthActions.refresh();
      const completion = AuthActions.authSuccess({ accessToken: 'testToken' });

      actions$ = hot('-a', { a: action });
      authService.refresh.and.returnValue(cold('-b', { b: { accessToken: 'testToken' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.refresh$).toBeObservable(expected);
    });

    it('givenRefreshAction_whenServiceFails_thenDispatchErrorAndRoute', () => {
      const action = AuthActions.refresh();
      const completion = AuthActions.authFailure({ error: 'Failed' });

      actions$ = hot('-a', { a: action });
      authService.refresh.and.returnValue(throwError(() => new Error('Failed')));

      const expected = cold('-c', { c: completion });

      expect(effects.refresh$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('givenRefreshAction_whenErrorReturned_thenDispatchErrorAndRoute', () => {
      const action = AuthActions.refresh();
      const completion = AuthActions.authFailure({ error: 'testError' });

      actions$ = hot('-a', { a: action });
      authService.refresh.and.returnValue(cold('-b', { b: { error: 'testError' } }));

      const expected = cold('--c', { c: completion });

      expect(effects.refresh$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('givenRefreshAction_whenNoErrorOrKeyReturned_thenDispatchUnknownErrorAndRoute', () => {
      const action = AuthActions.refresh();
      const completion = AuthActions.authFailure({ error: "An unknown error occurred. Please try again." });

      actions$ = hot('-a', { a: action });
      // Simulate a response that has neither accessToken nor error.
      authService.refresh.and.returnValue(cold('-b', { b: {} }));

      const expected = cold('--c', { c: completion });

      expect(effects.refresh$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  })
});