import AppState from "../state/app.state";
import { createSelector } from "@ngrx/store";

export const selectAuthState = (state: AppState) => state.auth;

export const selectAuthError = createSelector(
  selectAuthState,
  auth => auth.error
)

export const selectAuthToken = createSelector(
  selectAuthState,
  auth => auth.accessToken
)