import { createAction, props } from '@ngrx/store';

export const authSuccess = createAction(
  '[Auth] Success',
  props<{ accessToken: string }>()
);

export const authFailure = createAction(
  '[Auth] Failure',
  props<{ error: string }>()
);