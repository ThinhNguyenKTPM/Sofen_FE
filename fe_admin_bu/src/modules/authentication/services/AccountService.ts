import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "app/service/baseQuery.ts";
import {User} from "authentication/models/User.ts";

const accountServiceApi = createApi({
    reducerPath: "accountServiceApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Accounts'],
    endpoints: (builder) => ({

        getAccount: builder.query<User, unknown>({
            query: () => ({
                url: `/user/account`,
                method: "GET",
            }),
            providesTags: ['Accounts']
        }),

        updateAccount: builder.mutation<User, User>({
            query: (body) => ({
                url: "/user/account",
                method: "PUT",
                body: body
            }),
            invalidatesTags: ['Accounts'],
        }),

    }),
});

export const {
    useGetAccountQuery,
    useUpdateAccountMutation
} = accountServiceApi;
export default accountServiceApi;