import { Action } from "@ngrx/store";

export interface AuthState {
  accessToken: string | null;
}

export const initialState: AuthState = {
  accessToken: null,
};

export function authReducer(state = initialState, action: Action): AuthState {
  switch (action.type) {
    default:
      return state;
  }
}