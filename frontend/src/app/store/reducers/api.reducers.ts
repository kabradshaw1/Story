import { createReducer } from "@ngrx/store";
import { initialApiState } from "../state/api.state";

export const apiReducer = createReducer(
  initialApiState
)