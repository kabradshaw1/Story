import { AuthState, initialAuthState } from "../state/auth.state";
import * as AuthActions from '../actions/auth.actions';
import authReducer from "./auth.reducers";

describe('Auth Reducer', () => {
  it('givenUnknownAction_whenReducerCalled_thenNoStateChange', () => {
    // This also servers to check that the inital state is set to
    const action = { type: 'UNKNOWN' };
    const state = authReducer(initialAuthState, action);

    expect(state).toBe(initialAuthState);
  });

  it('givenSuccess_whenReducerCalled_thenUpdateState', () => {
    const initialStateWithError: AuthState = {
      accessToken: null,
      error: 'Some initial error'
    };

    const action = AuthActions.authSuccess({ accessToken: 'test-access-token' });
    const state = authReducer(initialStateWithError, action);

    expect(state.accessToken).toBe('test-access-token');
    expect(state.error).toBe(null); // Check that error is reset to null
  });

  it('givenFailure_whenReducerCalled_thenUpdateState', () => {
    const initialStateWithToken: AuthState = {
      accessToken: 'some-access-token',
      error: null
    };

    const action = AuthActions.authFailure({ error: 'Some error message' });
    // {
    //   type: '[Auth] Failure',
    //   payload: { error: 'Some error message' }
    // };
    const state = authReducer(initialStateWithToken, action);

    expect(state.accessToken).toBe(null); // Check that token is reset to null
    expect(state.error).toBe('Some error message');
  });
})