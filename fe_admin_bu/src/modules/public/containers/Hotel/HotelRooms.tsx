import {Text} from "components/typhograpy/Text.tsx";
import {Flex} from "antd";
import {appConfig} from "app/config/AppConfig.ts";
import styled from "styled-components";
import {RoomDetail} from "public/containers/Hotel/RoomDetail.tsx";
import {useTranslation} from "react-i18next";
import {SearchHotel} from "public/models/Search.ts";
import {useGetHotelsQuery} from "public/services/HotelServiceApi.ts";

export interface HotelRoomsProps {
    hotelName: string;
    filter: SearchHotel;
}
export const HotelRooms = ({hotelName, filter} : HotelRoomsProps) => {
    const {t} = useTranslation();

    const {data : rooms } = useGetHotelsQuery(filter);
    console.log(rooms);
    return (
        <StyledHotelRooms>
            <Flex gap={4}>
                <Text fontSize={"16px"}>{t('hotelPage.roomAtHotel')}</Text>
                <Text fontSize={"16px"} color={appConfig.colors.primary}>{hotelName}</Text>
            </Flex>
            {
                rooms && rooms.map((room, index) => (
                    <RoomDetail key={index} room={room}/>
                ))
            }
            {/*<RoomDetail />*/}
            {/*<RoomDetail />*/}
            {/*<RoomDetail />*/}
        </StyledHotelRooms>
    )
}
const StyledHotelRooms = styled.div`
    margin-top: 12px
`;