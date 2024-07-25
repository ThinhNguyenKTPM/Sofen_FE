import {Title} from "components/typhograpy/Title.tsx";
import {BookingTable} from "@/modules/admin/containers/Booking/BookingTable.tsx";
import {BookingFilter} from "@/modules/admin/containers/Booking/BookingFilter.tsx";
import {BookingHistoryReq} from "authentication/models/BookingHistory.ts";
import {useEffect, useState} from "react";

export const BookingManagement = () => {
    const defaultParamsQuery: BookingHistoryReq = {
        status: "ALL",
        page: 1,
        size: 5,
        sort: "created_at",
        direction: "descend"
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
        if (value === null)
            setParamsQuery(defaultParamsQuery);
        else
            setParamsQuery({...defaultParamsQuery, hotelId: value});
    }


    const onReset = () => {
        setParamsQuery(defaultParamsQuery);
    }
    return (
        <div>
            <Title level={5} children={"Quản lý đặt phòng"}/>
            <BookingFilter
                onChangeStatus={onChangeStatus}
                onChangeDateRange={onChangeRang}
                onReset={onReset}
                onChangeHotelName={onChangeHotelName}
                isDetailHotel={false}
            />
            <BookingTable
                paramsQuery={paramsQuery}
                accountTableOnChange={accountTableOnChange}

            />

        </div>
    );
}
