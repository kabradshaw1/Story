import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accessToken: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ accessToken: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const refreshSuccess = createAction(
  '[Auth] Refresh Success',
  props<{ accessToken: string }>()
);

export const refreshFailure = createAction(
  '[Auth] Refresh Failure',
  props<{ error: string }>()
);