import { createSelector } from "reselect";

const state = (state: any) => state.requestReducer;

export const fetchState = createSelector(
    state,
    (homePage) => homePage
);
