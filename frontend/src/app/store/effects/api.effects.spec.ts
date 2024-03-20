import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { ApiEffects } from "./api.effects";
import * as ApiActions from "../actions/api.actions";
import { ApiService } from "src/app/services/api.service";
import { cold, hot } from 'jasmine-marbles';

describe('ApiEffects', () => {
  let effects: ApiEffects;
  let actions$: Observable<Action>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiEffects,
        provideMockActions(() => actions$),
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj(
            'ApiService', ['get', 'delete', 'put', 'post'])
        }
      ]
    })

    effects = TestBed.inject(ApiEffects);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>
  });

  describe('get$', () => {
    it('givenGetAction_whenServiceSucceeds_thenDispatchApiService', () => {
      const endpoint = '/characters';
      const action = ApiActions.apiLoad({endpoint});
      const completion = ApiActions.apiSuccess({
        endpoint: "characters",
        data: {title: 'title', body: 'body'}
      });

      actions$ = hot('-a', { a: action });
      apiService.get.and.returnValue(cold('-b', { b: {}}));

      const expected = cold('--c', { c: completion });
      expect(effects.get$).toBeObservable(expected);
    });
    it('givenGetAction_whenErrorReturend_thenDispatchError', () => {
      const endpoint = '/characters';
      const action = ApiActions.apiLoad({endpoint});
      const completion = ApiActions.apiFailure({
        endpoint: "/characters",
        message: "test error"
      });

      actions$ = hot('-a', {a: action});
      apiService.get.and.returnValue(cold('-b', { b: { error: 'testError' }}))
      
    });
    it('givenGetAction_whenServiceFails_thenDispatchError', () => {

    });
    it('givenGetAction_whenNothingReturned_thenDisplayUnknownError', () => {

    });
  });

  describe('delete$', () => {
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
  });
  describe('post$', () => {
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
  });
  describe('put$', () => {
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
  });
})