import {createSlice} from "@reduxjs/toolkit";
import i18next from "i18next";
interface AppSliceProps {
    screen: string;
    language: string;
}
const initialState: AppSliceProps = {
    screen: "",
    language: localStorage.getItem("lang") || "vi",
};
const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        changeScreen(state, action: { payload: string }) {
            state.screen = action.payload;
        },
        changeLanguage(state, action: { payload: string }) {
            console.log(action.payload);
            i18next.changeLanguage(action.payload, () => {
                state.language = action.payload;
                localStorage.setItem("lang", action.payload);
            });
        },
    },
});

const {actions, reducer} = appSlice;
export const {changeScreen, changeLanguage} = actions;
export default reducer;