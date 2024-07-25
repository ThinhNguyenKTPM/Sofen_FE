import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "app/config/AppEnvironment.ts";
import {
    ChangePasswordReq,
    CheckOPTReq,
    RequireResetPasswordReq,
    RequireResetPasswordRes
} from "authentication/models/RequireResetPassword.ts";

export const resetPasswordServiceApi = createApi({
    reducerPath: "resetPasswordServiceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_ENDPOINT + "/auth",
    }),
    endpoints: (builder) => ({
        requireResetPassword: builder.mutation<
            RequireResetPasswordRes,
            RequireResetPasswordReq
        >({
            query: (body) => ({
                url: "/forgot-password",
                method: "POST",
                body: body,
            }),
        }),
        checkOTP: builder.mutation<RequireResetPasswordRes, CheckOPTReq>({
            query: (body) => ({
                url: "/validate",
                method: "POST",
                body: body,
            }),
        }),
        changePassword: builder.mutation<
            RequireResetPasswordRes,
            ChangePasswordReq
        >({
            query: (body) => ({
                url: "/change-password",
                method: "POST",
                body: body,
            }),
        }),
    }),
});
export const {
    useRequireResetPasswordMutation,
    useCheckOTPMutation,
    useChangePasswordMutation,
} = resetPasswordServiceApi;
export default resetPasswordServiceApi;
