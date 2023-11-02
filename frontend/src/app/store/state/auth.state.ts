export interface AuthState {
  accessToken: string | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo2MzA3MjAwMDB9.Gndt2aCi_IklJ-F5WugWm2_9e4Kit5nXBDxHDG3FatY',
  error: null
}