export interface Post {
  title: string,
  body?: string,
}

export interface ApiError {
  endpoint: string,
  message: string,
}

export interface ApiState {
  character: Post | null,
  scene: Post | null,
  location: Post | null,
  region: Post | null,
  conflict: Post | null,
  organization: Post | null,
  timeline: Number | null,
  error: ApiError | null
}

export const initialApiState: ApiState = {
  character: null,
  scene: null,
  location: null,
  region: null,
  conflict: null,
  organization: null,
  timeline: null,
  error: null,
}