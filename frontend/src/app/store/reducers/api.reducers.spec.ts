import { ApiState, initialApiState } from "../state/api.state";
import * as ApiActions from '../actions/api.actions';
import { apiReducer } from "./api.reducers";

describe('Api Reducer', () => {
  it('givenUnknownAction_whenReducerCalled_thenNoStateChange', () => {
    const action = { type: 'UNKNOWN' };
    const state = apiReducer(initialApiState, action);

    expect(state).toBe(initialApiState);
  });
  it('givenSuccess_whenReducerCalled_thenUpdateState', () => {
    
    const initialStateWithError: ApiState = {
      character: null,
      scene: null,
      location: null,
      region: null,
      conflict: null,
      organization: null,
      timeline: null,
      error: {endpoint:'/characters', message:'some inital error'}
    };

    const action = ApiActions.apiSuccess(
      {
        endpoint: '/characters', 
        data: { 
          title: 'test title', 
          body: 'test body' 
        }
      }
    );

    const state = apiReducer(initialStateWithError, action);

    expect(state.character?.body).toBe('test body');
    expect(state.character?.title).toBe('test title');
    expect(state.error).toBe(null); // Check that error is reset to null
  });
  
  it('givenFailure_whenReducerCalled_thenUpdateState', () => {
    const action = ApiActions.apiFailure({
      endpoint: "/characters",
      message: "test error"
    })
    const state = apiReducer(initialApiState, action);

    expect(state.error?.message).toBe('test error');
    expect(state.error?.endpoint).toBe('/characters');
  });
})