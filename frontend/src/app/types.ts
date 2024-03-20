export interface SuccessResponse {
  accessToken: string;
};

interface SuccessApiResponse {
  post?: {title: string, body: string},
  timeline?: {timeline: number};
};

interface ErrorResponse {
  status: number,
  error: string;
};

export type AuthResponse = SuccessResponse | ErrorResponse;

export type ApiResponse = SuccessApiResponse | ErrorResponse;

export type DecodedJwt = {
  username: string,
  id: number,
  isAdmin: boolean,
  exp: number, // Expiry time
  iat?: number, // Issued at time (automatically provided by JWT standard claims)
  iss: string; // Issuer
};