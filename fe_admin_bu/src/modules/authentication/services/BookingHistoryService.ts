import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "app/service/baseQuery.ts";
import {BookingHistoryReq, BookingHistoryRes} from "authentication/models/BookingHistory.ts";
import {PageableRes} from "authentication/models/Paging.ts";

const BookingHistoryApi = createApi({
    reducerPath: "bookingHistoryApi",
    baseQuery: baseQuery,
    tagTypes: ["BookingHistory"],
    endpoints: (builder) => ({
        getBookingHistory: builder.query<PageableRes<BookingHistoryRes[]>, BookingHistoryReq>({
            query: (params) => ({
                url: `/user/booking-history`,
                method: "GET",
                params: {
                    size: params.size,
                    page: params.page,
                    sort: params.sort,
                    direction: params.direction,
                    status: params.status,
                }
            }),
            // providesTags: ['BookingHistory']
        }),
    })
});
export const {
    useGetBookingHistoryQuery
} = BookingHistoryApi;
export default BookingHistoryApi;