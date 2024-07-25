import {BookingFilter} from "@/modules/admin/containers/Booking/BookingFilter.tsx";
import {BookingTable} from "@/modules/admin/containers/Booking/BookingTable.tsx";
import {BookingHistoryReq} from "authentication/models/BookingHistory.ts";
import {useEffect, useState} from "react";

export interface HotelDetailBookingProps {
    hotelId: string;
}

export const HotelDetailBooking = ({hotelId}: HotelDetailBookingProps) => {

    const defaultParamsQuery: BookingHistoryReq = {
        status: "ALL",
        page: 1,
        size: 5,
        sort: "created_at",
        direction: "descend",
        hotelId: hotelId
    }
    const [paramsQuery, setParamsQuery] = useState<BookingHistoryReq>(defaultParamsQuery);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [paramsQuery]);
    const accountTableOnChange = (params: BookingHistoryReq) => {
        console.log("params", params)
        setParamsQuery(params);
    }
    const onChangeRang = (dateStrings: [string, string]) => {
        console.log("checkIn", dateStrings[0]);
        console.log("checkOut", dateStrings[1]);
    }
    const onChangeStatus = (value: string) => {
        console.log("status", value);
    }
    const onChangeHotelName = (value: string) => {
        console.log("hotelName", value);
    }


    const onReset = () => {
        setParamsQuery({
            hotelId: hotelId,
            status: "ALL",
            page: 1,
            size: 5,
            sort: "createdAt",
            direction: "descend"
        });
    }
    return (
        <div>
            <BookingFilter
                onChangeStatus={onChangeStatus}
                onChangeDateRange={onChangeRang}
                onReset={onReset}
                onChangeHotelName={onChangeHotelName}
                isDetailHotel={true}
            />
            <BookingTable
                paramsQuery={paramsQuery}
                accountTableOnChange={accountTableOnChange}

            />

        </div>
    );
}