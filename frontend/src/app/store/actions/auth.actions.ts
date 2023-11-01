import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login Request',
  props<{ email: string; password: string }>()
);

export const register = createAction(
  '[Auth] Register Request',
  props<{ email: string; password: string; username: string }>()
);

export const refresh = createAction(
  '[Auth] Refresh Token Request'
);

export const authSuccess = createAction(
  '[Auth] Success',
  props<{ accessToken: string }>()
);

export const authFailure = createAction(
  '[Auth] Failure',
  props<{ error: string }>()
);
