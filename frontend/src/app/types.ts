export interface SuccessResponse {
  accessToken: string;
}

interface ErrorResponse {
  status: number;
  error: string;
}

export type AuthResponse = SuccessResponse | ErrorResponse;
