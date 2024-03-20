export interface Post {
  title?: string,
  body?: string,
  timeline?: string;
}

export interface ApiError {
  endpoint: string,
  message: string;
}

export interface ApiState {
  characters: Post | null,
  scenes: Post | null,
  locations: Post | null,
  regions: Post | null,
  conflicts: Post | null,
  organizations: Post | null,
  timelines: Post | null,
  error: ApiError | null;
}

export const initialApiState: ApiState = {
  characters: null,
  scenes: null,
  locations: null,
  regions: null,
  conflicts: null,
  organizations: null,
  timelines: null,
  error: null
}