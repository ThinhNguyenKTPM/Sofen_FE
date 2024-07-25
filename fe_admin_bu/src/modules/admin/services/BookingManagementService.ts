import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "app/service/baseQuery.ts";
import {Profit} from "@/modules/admin/page/Dashboard.tsx";
import {UserCreateRes} from "@/modules/admin/model/UserManagement.ts";
import {BookingHistoryReq, BookingHistoryRes} from "authentication/models/BookingHistory.ts";
import {PageableRes} from "authentication/models/Paging.ts";

export const BookingManagementService = createApi({
    reducerPath: 'BookingManagementService',
    baseQuery: baseQuery,
    tagTypes: ['BookingManagement'],
    endpoints: (builder) => ({
        getBookingCreate: builder.query<Profit[], any>({
            query: (params) => ({
                url: '/management/booking/created',
                method: 'GET',
                params: {
                    time: params.time,
                    type: params.type,
                    from: params.from,
                    to: params.to,
                    hotelId: params.hotelId,
                }
            }),
        }),
        getBookingProfit: builder.query<UserCreateRes[], any>({
            query: (params) => ({
                url: '/management/booking/profit',
                method: 'GET',
                params: {
                    time: params.time,
                    type: params.type,
                    from: params.from,
                    to: params.to,
                    hotelId: params.hotelId,
                }
            }),
        }),
        getBookingProfitTime: builder.query<UserCreateRes[], any>({
            query: (params) => ({
                url: '/management/booking/profit/time',
                method: 'GET',
                params: {
                    time: params.time,
                    type: params.type,
                    from: params.from,
                    to: params.to,
                    hotelId: params.hotelId,
                }
            }),
        }),
        getBookingHistory: builder.query<PageableRes<BookingHistoryRes[]>, BookingHistoryReq>({
            query: (params) => {
                return {
                    url: `/management/booking`,
                    method: "GET",
                    params: {
                        size: params.size,
                        page: params.page,
                        sort: params.sort,
                        direction: params.direction,
                        status: params.status,
                        hotelId: params.hotelId,
                        userId: params.userId,
                        type: params.type,

                    }
                }
            }
        }),
    })
});

export const {
    useGetBookingCreateQuery,
    useGetBookingProfitQuery,
    useGetBookingProfitTimeQuery,
    useGetBookingHistoryQuery
} = BookingManagementService;

export default BookingManagementService;