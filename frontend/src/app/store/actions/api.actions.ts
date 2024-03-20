import { createAction, props } from '@ngrx/store';
import { Post, ApiError } from '../state/api.state'; // Assuming you have an api.models.ts

// Success and Failure actions can remain generic and used by effects to respond to API call outcomes
export const apiSuccess = createAction(
  '[Api] Success',
  props<{ endpoint: string, data: any }>()
);

export const apiFailure = createAction(
  '[Api] Failure',
  props<ApiError>() // Utilize your ApiError interface
);

// CRUD Operations
export const apiLoad = createAction(
  '[Api] Load', // General GET request, could be for listing entities
  props<{ endpoint: string }>()
);

export const apiGet = createAction(
  '[Api] Get Entity', // Specific GET request to fetch a single entity by ID
  props<{ endpoint: string, id: string | number }>()
);

export const apiCreate = createAction(
  '[Api] Create',
  props<{ endpoint: string, payload: Post}>() // Example using Post, adjust as needed for flexibility
);

export const apiUpdate = createAction(
  '[Api] Update',
  props<{ endpoint: string, id: string | number, payload: Post }>()
);

export const apiDelete = createAction(
  '[Api] Delete',
  props<{ endpoint: string, id: string | number }>()
);

