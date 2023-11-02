export interface AuthState {
  accessToken: string | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: null,
  error: null
}