import AppState from "../state/app.state";
import { createSelector } from "@ngrx/store";

export const selectApiState = (state: AppState) => state.api;

export const selectCharacter = createSelector(
    selectApiState,
    api => { api.character.title, api.character.body }
)

