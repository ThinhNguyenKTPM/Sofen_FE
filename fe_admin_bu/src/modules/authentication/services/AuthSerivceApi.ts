import {baseQuery} from "app/service/baseQuery.ts";
import {createApi} from "@reduxjs/toolkit/query/react";
import {CreateAccountReq, LoginReq, LoginRes, LogoutReq, LogoutRes, User} from "authentication/models/User.ts";

const authApi = createApi({
    reducerPath: "register",
    baseQuery: baseQuery,
    tagTypes: ["Account"],
    endpoints: (builder) => ({
        register: builder.mutation<User, CreateAccountReq>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body: body,
            }),
        }),
        login: builder.mutation<LoginRes, LoginReq>({
            query: (body) => ({
                url: "/auth/token",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Account"],
        }),
        logout: builder.mutation<LogoutRes, LogoutReq>({
            query: (body) => ({
                url: "/auth/logout",
                method: "POST",
                body: body,
            }),
        }),

    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation
} = authApi;
export default authApi;