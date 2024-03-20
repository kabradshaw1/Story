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
            'ApiService', ['load', 'delete', 'put', 'post'])
        }
      ]
    })

    effects = TestBed.inject(ApiEffects);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>
  });

  describe('load$', () => {
    it('givenLoadAction_whenServiceSucceeds_thenDispatchApiService', () => {
      const endpoint = 'characters';
      const action = ApiActions.apiLoad({endpoint});
      const completion = ApiActions.apiSuccess({
        endpoint: endpoint,
        data: {title: 'title', body: 'body'}
      });

      actions$ = hot('-a', { a: action });
      apiService.load.and.returnValue(cold('-b', { b: {title: 'title', body: 'body'}}));

      const expected = cold('--c', { c: completion });
      expect(effects.load$).toBeObservable(expected);
    });
    it('givenLoadAction_whenErrorReturned_thenDispatchError', () => {
      const endpoint = 'characters';
      const errorMessage = 'test error';
      const action = ApiActions.apiLoad({endpoint});
      const completion = ApiActions.apiFailure({
        endpoint: endpoint,
        message: errorMessage
      });
    
      actions$ = hot('-a', {a: action});
      // Use cold observable to simulate the service throwing an error immediately after being called
      apiService.load.and.returnValue(cold('-#', null, new Error(errorMessage)));
    
      const expected = cold('--b', { b: completion });
    
      expect(effects.load$).toBeObservable(expected);
    });
    
    it('givenLoadAction_whenServiceFails_thenDispatchError', () => {
      const endpoint = 'characters';
      const action = ApiActions.apiLoad({endpoint});
      const completion = ApiActions.apiFailure({
        endpoint: endpoint,
        message: "test error"
      });

      actions$ = hot('-a', {a: action});
      apiService.load.and.returnValue(throwError(() => new Error('test error')))

      const expected = cold('-b', { b: completion});

      expect(effects.load$).toBeObservable(expected);
    });
  });

  // describe('delete$', () => {
  //   it('givenDeleteAction_whenApiSuccess_thenDispatchResponse', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  // });
  // describe('post$', () => {
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  // });
  // describe('put$', () => {
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  // });
})