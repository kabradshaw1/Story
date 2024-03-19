import { createReducer, on } from "@ngrx/store";
import { initialApiState, ApiState } from "../state/api.state";
import { apiSuccess, apiFailure } from "../actions/api.actions";

export const apiReducer = createReducer(
  initialApiState,

  on(apiSuccess, (state, { endpoint, data }) => {
    return {
      ...state,
      [endpoint]: data,
      error: null
    }
  }),

  on(apiFailure, (state, { endpoint, message }) => {
    return {
      ...state,
      error: { endpoint, message }
    }
  })
)