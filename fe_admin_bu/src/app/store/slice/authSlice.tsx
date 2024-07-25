
import {createSlice} from "@reduxjs/toolkit";
import {User} from "authentication/models/User.ts";

interface AuthProps {
    ready: boolean,
    account: User | null;
}

const initialState: AuthProps = {
    ready: false,
    account: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.account = action.payload;
        },

        onReady: (state, action: { payload: User }) => {
            state.ready = true;
            state.account = action.payload;
        },

        onError: (state) => {
            state.ready = true;
            state.account = null;
        }
    },
});
export const {setCredentials, onReady, onError} = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuth = (state: any) => state.auth;
