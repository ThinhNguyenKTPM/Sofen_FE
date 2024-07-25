import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "app/service/baseQuery.ts";

export const HotelServiceManagement = createApi({
    reducerPath: 'HotelServiceManagement',
    baseQuery: baseQuery,
    tagTypes: ['HotelServiceManagement'],
    endpoints: (builder) => ({
        getHotelById: builder.query<any, string>({
            query: (hotelId) => ({
                url: `/management/hotels/${hotelId}`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllService: builder.query<any, unknown>({
            query: () => ({
                url: `/management/services`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllServiceByHotelId: builder.query<any, any>({
            query: (hotelId) => ({
                url: `/management/services/${hotelId}`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllPolicy: builder.query<any, unknown>({
            query: () => ({
                url: `/management/policies/all`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllPolicyByHotelId: builder.query<any, unknown>({
            query: (hotelId) => ({
                url: `/management/policies/${hotelId}`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllRoomType: builder.query<any, unknown>({
            query: () => ({
                url: `/management/room-type`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllRoomByHotelId: builder.query<any, any>({
            query: (hotelId) => ({
                url: `/management/rooms/${hotelId}`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllFurnitureRoom: builder.query<any, unknown>({
            query: () => ({
                url: `management/room-furniture`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),
        getAllFurnitureRoomByRomId: builder.query<any, any>({
            query: (roomId) => ({
                url: `management/room-furniture/${roomId}`,
                method: 'GET',
            }),
            providesTags: ['HotelServiceManagement'],
        }),

    }),
});


export const {
    useGetHotelByIdQuery,
    useGetAllServiceQuery,
    useGetAllServiceByHotelIdQuery,
    useGetAllPolicyQuery,
    useGetAllPolicyByHotelIdQuery,
    useGetAllRoomTypeQuery,
    useGetAllRoomByHotelIdQuery,
    useGetAllFurnitureRoomQuery,
    useGetAllFurnitureRoomByRomIdQuery,
} = HotelServiceManagement;

export default HotelServiceManagement;