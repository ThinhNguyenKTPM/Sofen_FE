import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "app/service/baseQuery.ts";
import {RoomDetailResponse} from "public/models/Room.ts";
import {SearchHotel} from "public/models/Search.ts";

export const roomServiceApi = createApi({
    reducerPath: "roomServiceApi",
    baseQuery: baseQuery,
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        getHotels: builder.query<RoomDetailResponse[], SearchHotel>({
            query: (params) => ({
                url: `/public/hotels/${params.hotelId}`,
                method: "GET",
                params: {
                    hotelId: params.hotelId,
                    checkIn: params.checkIn,
                    checkOut: params.checkOut,
                    adults: params.adults,
                    children: params.children,
                    fromPrice: params.fromPrice,
                    toPrice: params.toPrice,
                    roomAmount: params.roomAmount
                },
            }),
            providesTags: ["Room"],
        }),
    })

});

export const {
    useGetHotelsQuery,
} = roomServiceApi;