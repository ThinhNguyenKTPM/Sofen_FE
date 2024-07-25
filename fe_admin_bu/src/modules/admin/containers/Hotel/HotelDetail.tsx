import {AnyObject} from "antd/lib/_util/type";

import * as Yup from 'yup';
import {useFormik} from "formik";
import {HotelManagementInfoDetail} from "@/modules/admin/containers/Hotel/hotel_detail/HotelManagementInfoDetail.tsx";
import {ContainerOutlined, FileAddOutlined, LeftOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import React, {ReactNode, useEffect, useState} from "react";
import {getItem} from "authentication/components/profile/Slider.tsx";
import {Button, Flex, Menu, MenuProps} from "antd";
import styled from "styled-components";
import {HotelDetailBooking} from "@/modules/admin/containers/Hotel/hotel_detail/HotelDetailBooking.tsx";
import {HotelServiceDetail} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/HotelServiceDetail.tsx";
import {HotelPoliciesDetail} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_policies/HotelPoliciDetail.tsx";
import {HotelRoomDetail} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_rooms/HotelRoomDetail.tsx";
import {useGetHotelByIdQuery} from "@/modules/admin/services/HotelServiceManagement.ts";
import {Title} from "components/typhograpy/Title.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {useNavigate} from "react-router-dom";
import {AdminSiteMap} from "@/modules/admin/routers/AdminSiteMap.ts";
import {LoaderBig} from "components/LoadingBig.tsx";
import {AddHotelModal} from "@/modules/admin/containers/Hotel/AddHotelModal.tsx";
import {HotelDetailImage} from "@/modules/admin/containers/Hotel/hotel_detail/HotelDetailImage.tsx";

type MenuItem = Required<MenuProps>['items'][number];


export interface HotelDetailIdlProps {
    hotelId: string;
}

export const HotelDetail = ({hotelId}: HotelDetailIdlProps) => {
    const navigate = useNavigate();
    const {data: hotelDetail, isLoading} = useGetHotelByIdQuery(hotelId);
    const [hotelDetailInfo, setHotelDetailInfo] = useState<AnyObject>(hotelDetail);
    useEffect(() => {
        if (hotelDetail) {
            setHotelDetailInfo(hotelDetail);
            setHotelManagementRender(<HotelManagementInfoDetail hotelDetail={hotelDetail}/>)
        }
    }, [hotelDetail]);

    const [hotelManagementRender, setHotelManagementRender] =
        useState<ReactNode>();


    const items: MenuItem[] = [
        getItem('Thông tin khách sạn', '1', <UserOutlined/>),
        getItem('Ảnh', '2', <ContainerOutlined/>),
        getItem('Booking', '3', <ContainerOutlined/>),
        getItem('Dịch vụ', '4', <SettingOutlined/>),
        getItem('Chính sách', '5', <SettingOutlined/>),
        getItem('Phòng', '6', <SettingOutlined/>)
    ];

    const menuOnClick = (key: string) => {
        switch (key) {
            case '1':
                setHotelManagementRender(<HotelManagementInfoDetail hotelDetail={hotelDetailInfo}/>);
                break;
            case '2':
                setHotelManagementRender(<HotelDetailImage hotelDetail={hotelDetailInfo}/>);
                break;
            case '3':
                setHotelManagementRender(<HotelDetailBooking hotelId={hotelDetail.id || ""}/>);
                break;
            case '4':
                setHotelManagementRender(<HotelServiceDetail hotelId={hotelDetail.id || ""}/>);
                break;
            case '5':
                setHotelManagementRender(<HotelPoliciesDetail hotelId={hotelDetail.id || ""}/>);
                break;
            case '6':
                setHotelManagementRender(<HotelRoomDetail hotelId={hotelDetail.id || ""}/>);
                break;
        }
    }

    const handleReturn = () => {
        navigate(AdminSiteMap.HOTELS_MANAGEMENT)
    }
    return (
        <>
            {
                isLoading ?
                    <LoaderBig spinner={true}/> :
                    (

                        <div>
                            <Flex gap={12} align={"center"}>
                                <StyledResetButton>
                                    <Button
                                        children={
                                            <Flex align={"center"} justify={"center"}>
                                                <LeftOutlined/>
                                                <span>Quay lại</span>
                                            </Flex>
                                        }
                                        onClick={handleReturn}
                                        style={{
                                            width: "110px",
                                            height: "30px",
                                        }}
                                    />
                                </StyledResetButton>

                                {
                                    <Title children={hotelDetail?.name} color={appConfig.colors.primary} level={4}/>
                                }

                            </Flex>

                            <StyledMenu
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                theme="light"
                                items={items}
                                onClick={(e) => menuOnClick(e.key.toString())}
                            />
                            {
                                hotelDetail &&
                                <StyledHotelDetaiManagement>
                                    {hotelManagementRender}

                                </StyledHotelDetaiManagement>
                            }

                        </div>
                    )
            }
        </>

    )
};

const StyledMenu = styled(Menu)`
    margin-top: 10px;
    border-radius: 6px;

    .ant-menu-inline .ant-menu-item {
        height: 50px !important;
    }
`

const StyledHotelDetaiManagement = styled.div`
    margin-top: 10px;
    padding: 10px;
    background-color: white;
    border-radius: 6px;
`;

