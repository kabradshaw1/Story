export interface Post {
  title?: string,
  body?: string,
}

export interface ApiState {
  character: Post,
  scene: Post,
  location: Post,
  region: Post,
  conflict: Post,
  organization: Post,
}