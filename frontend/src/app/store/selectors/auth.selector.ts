import AppState from "../state/app.state";

export const selectAuthError = (state: AppState) => state.auth.error;