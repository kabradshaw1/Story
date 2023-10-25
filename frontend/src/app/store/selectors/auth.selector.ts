import { AuthState } from "../state/auth.state";

export const selectAuthError = (state: AuthState) => state.error;