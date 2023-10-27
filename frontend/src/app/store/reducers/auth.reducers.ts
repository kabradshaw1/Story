import { createReducer, on, Action } from '@ngrx/store';
import { authSuccess, authFailure } from '../actions/auth.actions';
import { AuthState, initialAuthState } from '../state/auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(authSuccess, (state, { accessToken }) => ({
    ...state,
    accessToken,
    error: null
  })),

  on(authFailure, (state, { error }) => ({
    ...state,
    accessToken: null,
    error
  }))
);

// To ensure type-safety, use a default exported function to handle the actual reducer call
export default function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
