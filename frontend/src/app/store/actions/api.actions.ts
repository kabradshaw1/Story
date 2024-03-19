import { createAction, props } from "@ngrx/store";

export const apiSuccess = createAction(
  '[Api] Success' 
)

export const apiPost = createAction(
  '[Api] Post Request',
  props<{ endpoint: string, title: string, body: string }>() 
)

export const apiGet = createAction(
  '[Api] Get Request',
  props<{endpoint: string}>()
)