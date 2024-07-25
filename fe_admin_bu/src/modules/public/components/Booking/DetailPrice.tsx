import styled from "styled-components";
import {Text} from "components/typhograpy/Text.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {Flex} from "antd";
import {Currency} from "components/currency/Currency.tsx";
import {useTranslation} from "react-i18next";
import {countDate} from "public/utils/DateUtils.ts";
import {SearchHotel} from "public/models/Search.ts";
import {RoomDetailResponse} from "public/models/Room.ts";

export interface BookingDrops {
    searchHotel?: SearchHotel;
    roomDetailResponse?: RoomDetailResponse;
}
export const DetailPrice = ({searchHotel, roomDetailResponse} :  BookingDrops) => {
    const {t} = useTranslation();
    const rooms = searchHotel?.roomAmount;
    console.log("abc rooms", roomDetailResponse);
    const nights = countDate(searchHotel?.checkIn, searchHotel?.checkOut);
    const total = roomDetailResponse?.price * rooms * nights;
    return (
        <StyledDetailPrice gap={6} vertical={true}>
            <Flex vertical={true} gap={6}>
                <Text fontSize="20px" fontWeight={700}>
                    {t('detailPrice.title')}
                </Text>
                <Text fontSize="16px" fontWeight={400}>
                    {rooms} {t('detailPrice.room')} x {nights}  {t('detailPrice.night')}
                </Text>
            </Flex>
            <Flex justify={"space-between"} gap={6}>
                <Text fontSize="16px" fontWeight={600}>
                    {t('detailPrice.roomPrice')}
                </Text>
                <Currency price={roomDetailResponse?.price*90/100}/>
            </Flex>
            <Flex justify={"space-between"} gap={6}>
                <Text fontSize="16px" fontWeight={400}>
                    {t('detailPrice.taxAndFee')}
                </Text>
                <Currency price={roomDetailResponse?.price*10/100}/>
            </Flex>
            <Flex justify={"space-between"} gap={6} className={"final-price"}>
                <Text fontSize="20px" fontWeight={700} color={appConfig.colors.primary}>
                    {t('detailPrice.total')}
                </Text>
                <Text fontSize="20px" fontWeight={700} color={appConfig.colors.primary}>
                    <Currency price={total}/>
                </Text>
            </Flex>
        </StyledDetailPrice>
    );
}
const StyledDetailPrice = styled(Flex)`
    padding: 24px;
    border-radius: 12px;
    background-color: ${appConfig.colors.background};
    .final-price{
        margin-top: 6px;
        padding-top: 6px;
        border-top: 1px solid ${appConfig.colors.fadedTxt};
    }       
`;