import { createAction, props } from "@ngrx/store";

export const apiSuccess = createAction(
  '[Api] Success' 
)

export const apiPost = createAction(
  '[Api] Post Request',
  props<{ title: string, body: string }>() 
)