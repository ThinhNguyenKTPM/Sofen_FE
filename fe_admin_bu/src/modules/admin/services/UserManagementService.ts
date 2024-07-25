import {createApi} from "@reduxjs/toolkit/query/react";
import {
    ManageAccountPaginationReq,
    ManageAccountRes,
    ManageCountRes,
    UserCreateRes
} from "@/modules/admin/model/UserManagement.ts";
import {baseQuery} from "app/service/baseQuery.ts";
import {PageableRes} from "authentication/models/Paging.ts";
import {AnyObject} from "antd/lib/_util/type";

export const UserManagementService = createApi({
    reducerPath: 'UserManagementService',
    baseQuery: baseQuery,
    tagTypes: ['UserManagement'],
    endpoints: (builder) => ({
        getAccountManagement: builder.query<PageableRes<AnyObject[]>, ManageAccountPaginationReq>({
            query: (params) => ({
                url: '/management/user/customer',
                method: 'GET',
                params: {
                    page: params.page,
                    size: params.size,
                    sort: params.sort,
                    status: params.status,
                    search: params.search,
                    direction: params.direction,
                }
            }),
        }),
        updateAccountStatus: builder.mutation<void, {id: string, status: string}>({
            query: ({id, status}) => ({
                url: `/management/account/${id}/status/${status}`,
                method: 'PUT',
            }),
        }),
        countUser: builder.query<ManageCountRes, {role: string}>({
            query: (params) => ({
                url: '/management/users/count',
                method: 'GET',
                params: {
                    role: params.role,
                }
            }),
        }),
        getUserCreate: builder.query<UserCreateRes[], { time: string }>({
            query: (params) => ({
                url: '/management/users',
                method: 'GET',
                params: {
                    time: params.time,
                }
            }),
        }),
        countHotel: builder.query<ManageCountRes, unknown>({
            query: () => ({
                url: '/management/hotels/count',
                method: 'GET',
            }),
        }),

    })
});

export const {
    useGetAccountManagementQuery,
    useUpdateAccountStatusMutation,
    useGetUserCreateQuery,
    useCountUserQuery,
    useCountHotelQuery,
} = UserManagementService;

export default UserManagementService;
