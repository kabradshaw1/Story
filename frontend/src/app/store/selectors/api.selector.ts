import AppState from "../state/app.state";
import { createSelector, select } from "@ngrx/store";

export const selectApiState = (state: AppState) => state.api;

export const selectCharacter = createSelector(
  selectApiState,
  api => { api.character?.title, api.character?.body }
)

export const selectScene = createSelector(
  selectApiState,
  api => { api.scene?.title, api.scene?.body }
)

export const selectTimeline = createSelector(
  selectApiState,
  api => api.timeline
)