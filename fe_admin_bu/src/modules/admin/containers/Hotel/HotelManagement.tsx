import {HotelFilter} from "@/modules/admin/containers/Hotel/HotelFilter.tsx";
import {HotelTable} from "@/modules/admin/containers/Hotel/HotelTable.tsx";
import React, {useEffect, useState} from "react";
import {HotelFilterReq} from "@/modules/admin/model/HotelManagement.ts";
import {Title} from "components/typhograpy/Title.tsx";
import {Flex} from "antd";
import {AnyObject} from "antd/lib/_util/type";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {AddHotelModal} from "@/modules/admin/containers/Hotel/AddHotelModal.tsx";

export const HotelManagement = () => {
    const defaultParamsQuery = {
        status: "ALL",
        page: 1,
        size: 8,
    } as HotelFilterReq;
    const [isDetail, setIsDetail] = useState(false);
    const [hotelDetail, setHotelDetail] = useState<AnyObject>({});
    const [queryParamsHotel, setQueryParamsHotel] = useState(defaultParamsQuery);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [queryParamsHotel]);
    const onReset = () => {
        setQueryParamsHotel(defaultParamsQuery);
    }
    const onChangeStatus = (value: string) => {
        setQueryParamsHotel({
            ...queryParamsHotel,
            status: value
        })
    }
    const handleHotelDetail = (record: AnyObject) => {
        setHotelDetail(record);
        setIsDetail(true);
    }
    return (
        <>
            <Flex align={"center"} gap={12}>
                <Title children={"Quản lý khách sạn"} level={5}/>
                {/*<div style={{*/}
                {/*    marginLeft: "auto",*/}
                {/*    marginRight: "10px"*/}
                {/*}}>*/}
                {/*    <AddHotelModal/>*/}
                {/*</div>*/}
            </Flex>

            {/*<HotelFilter*/}
            {/*    onReset={onReset}*/}
            {/*    onChangeStatus={onChangeStatus}*/}
            {/*/>*/}

            <HotelTable
                paramsQuery={queryParamsHotel}
                handleHotelDetail={handleHotelDetail}
                hotelTableOnChange={setQueryParamsHotel}
            />


        </>
    )

}