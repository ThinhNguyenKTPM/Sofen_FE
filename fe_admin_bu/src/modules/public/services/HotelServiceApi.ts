import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "app/service/baseQuery.ts";
import {RoomDetailResponse} from "public/models/Room.ts";
import {SearchHotel} from "public/models/Search.ts";
import {HotelDetailResponse, HotelName} from "public/models/Hotel.ts";

export const hotelServiceApi = createApi({
    reducerPath: "hotelServiceApi",
    baseQuery: baseQuery,
    tagTypes: ["Hotel"],
    endpoints: (builder) => ({
        getHotels: builder.query<RoomDetailResponse[], SearchHotel>({
            query: (params) => ({
                url: `/public/hotels`,
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
            providesTags: ["Hotel"],
        }),

        getListHotelName: builder.query<HotelName[], unknown>({
            query: () => ({
                url: `/public/hotels/names`,
                method: "GET",
            }),
            providesTags: ["Hotel"],
        }),
        getHotelDetailById: builder.query<HotelDetailResponse, string>({
            query: (hotelId) => ({
                url: `/public/hotels/${hotelId}`,
                method: "GET",
            }),
            providesTags: ["Hotel"],
        }),
        getDestination: builder.query<string[], string>({
            query: () => ({
                url: `/public/hotels/destinations`,
                method: "GET",
            }),
            providesTags: ["Hotel"],
        }),
    }),
});
export const {
    useGetHotelsQuery,
    useGetListHotelNameQuery,
    useGetHotelDetailByIdQuery,
} = hotelServiceApi;