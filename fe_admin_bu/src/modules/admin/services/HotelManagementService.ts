import {createApi} from "@reduxjs/toolkit/query/react";
import BookingManagementService from "@/modules/admin/services/BookingManagementService.ts";
import {baseQuery} from "app/service/baseQuery.ts";
import {HotelFilterReq} from "@/modules/admin/model/HotelManagement.ts";

export const HotelManagementService = createApi({
    reducerPath: 'HotelManagementService',
    baseQuery: baseQuery,
    tagTypes: ['HotelManagement'],
    endpoints: (builder) => ({
        createHotel: builder.mutation<any, any>({
            query: (body) => ({
                url: '/management/hotels',
                method: 'POST',
                body: body
            }),
        }),
        getHotel: builder.query<any, any>({
            query: (params) => ({
                url: '/management/hotel',
                method: 'GET',
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
            }),
        }),
        getHotelDetail: builder.query<any, any>({
            query: (hotelId) => ({
                url: `/management/hotel/${hotelId}`,
                method: 'GET'
            }),
        }),
        updateHotelStatus: builder.mutation<any, any>({
            query: (params) => ({
                url: '/management/hotel',
                method: 'PUT',
                body: params
            }),
        }),
        filter: builder.query<any, HotelFilterReq>({
            query: (params) => ({
                url: '/management/hotels/filter',
                method: 'GET',
                params: {
                    status: params.status,
                    page: params.page,
                    size: params.size,
                    sort: params.sort,
                    direction: params.direction,
                }
            }),
        }),
        addHotelService: builder.mutation<any, { hotelId: string, serviceId: number }>({
            query: (path) => ({
                url: `/management/hotels/${path.hotelId}/services/${path.serviceId}`,
                method: 'PUT',
            }),
        }),
        removeHotelService: builder.mutation<any, { hotelId: string, serviceId: number }>({
            query: (path) => ({
                url: `/management/hotels/${path.hotelId}/services/${path.serviceId}`,
                method: 'DELETE',
            }),
        }),
        addHotelPolicy: builder.mutation<any, { hotelId: string, policyId: number }>({
            query: (path) => ({
                url: `/management/hotels/${path.hotelId}/policies/${path.policyId}`,
                method: 'PUT',
            }),
        }),
        removeHotelPolicy: builder.mutation<any, { hotelId: string, policyId: number }>({
            query: (path) => ({
                url: `/management/hotels/${path.hotelId}/policies/${path.policyId}`,
                method: 'DELETE',
            }),
        }),

    })
});
export const {
    useCreateHotelMutation,
    useGetHotelQuery, useGetHotelDetailQuery, useUpdateHotelStatusMutation,
    useFilterQuery,
    useAddHotelServiceMutation,
    useRemoveHotelServiceMutation,
    useAddHotelPolicyMutation,
    useRemoveHotelPolicyMutation
} = HotelManagementService;


export default BookingManagementService;
