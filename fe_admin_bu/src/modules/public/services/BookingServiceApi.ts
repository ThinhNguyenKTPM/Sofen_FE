import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "app/service/baseQuery.ts";
import {Booking, BookingResponse, MessageResponse, VnpayReturnParams} from "public/models/Booking.ts";

export const bookingServiceApi = createApi({
    reducerPath: "bookingServiceApi",
    baseQuery: baseQuery,
    tagTypes: ["Booking"],
    endpoints: (builder) => ({
        creatBooking: builder.mutation<BookingResponse, Booking>({
            query: (body) => ({
                url: `/public/booking/create`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Booking"],
        }),
        paymentReturn: builder.query<MessageResponse, VnpayReturnParams>({
            query: (params) => ({
                url: `/public/booking/vnpay_return`,
                method: "GET",
                params: {
                    vnp_Amount: params.vnp_Amount,
                    vnp_BankCode: params.vnp_BankCode,
                    vnp_BankTranNo: params.vnp_BankTranNo,
                    vnp_CardType: params.vnp_CardType,
                    vnp_OrderInfo: params.vnp_OrderInfo,
                    vnp_PayDate: params.vnp_PayDate,
                    vnp_ResponseCode: params.vnp_ResponseCode,
                    vnp_TmnCode: params.vnp_TmnCode,
                    vnp_TransactionNo: params.vnp_TransactionNo,
                    vnp_TransactionStatus: params.vnp_TransactionStatus,
                    vnp_TxnRef: params.vnp_TxnRef,
                    vnp_SecureHash: params.vnp_SecureHash,
                },
            }),
        }),

    }),

});

export const {
   useCreatBookingMutation,
    usePaymentReturnQuery
} = bookingServiceApi;

export default bookingServiceApi;