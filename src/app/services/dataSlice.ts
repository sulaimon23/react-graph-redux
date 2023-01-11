import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./types";

const initialState: IState = {
    items: {},
    userData: {}
};

const StateSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setItemData(state, action) {
            state.items = action.payload;
        },
        setUserData(state, action) {
            state.userData = action.payload;
        }
    },
});

export const { setItemData, setUserData } = StateSlice.actions;
export default StateSlice.reducer;
