import {Flex, Image} from "antd";
import {Text} from "components/typhograpy/Text.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import styled from "styled-components";
import {countDate} from "public/utils/DateUtils.ts";
import {useGetHotelDetailByIdQuery} from "public/services/HotelServiceApi.ts";
import {BookingDrops} from "public/components/Booking/DetailPrice.tsx";

export const SummaryBooking = ({searchHotel, roomDetailResponse}: BookingDrops) => {
    const {data: hotelDetail, isLoading, refetch} = useGetHotelDetailByIdQuery(searchHotel?.hotelId ?? "");
    const mainImage = hotelDetail?.images.find((image) => image.isMain);
    const ellipsis = {
        rows: 4,
        expandable: false,
        // suffix: string,
        // symbol: ReactNode,
        // tooltip: boolean | ReactNode | TooltipProps,
        // onExpand: function (event),
        // onEllipsis: function (ellipsis),
    }
    return (
        <StyledSummaryBrooking vertical={true} gap={12}>
            <div className={"hotel-info"}>
                <Flex>
                    <img src={"src/assets/Booking/destination.svg"} alt={""}/>
                    <Text fontSize={"18px"} fontWeight={700}>
                        Tóm tắt đặt chỗ
                    </Text>
                </Flex>
                <Text fontSize={"20px"} fontWeight={700}>
                    {hotelDetail?.hotelName}
                </Text>
                <Flex gap={6} wrap={"wrap"} justify={"space-between"} className={"hotel-info-img"}>
                    <div className={"hotel-main-img"}>
                        <Image src={mainImage?.url}/>
                    </div>
                    <Paragraph fontSize={"16px"} color={"#000000"} className={"hotel-description"} ellipsis={ellipsis}>
                        {hotelDetail?.hotelDescription}
                    </Paragraph>
                </Flex>
            </div>
            <Flex gap={6} className={"dates-booking"} align={"center"} wrap={"wrap"} justify={"center"}>
                <Flex vertical={true} align={"center"} className={"dates-booking-checkin"} wrap={"wrap"}>
                    <Text fontSize={"16px"} fontWeight={400}>
                        Nhận phòng
                    </Text>
                    <Text fontSize={"14px"} fontWeight={600}>
                        {searchHotel?.checkIn}
                    </Text>
                    <Text fontSize={"14px"} fontWeight={600}>
                        14:00 - 22:00
                    </Text>

                </Flex>

                <Text fontSize={"16px"} fontWeight={400} className={"dates-booking-totals"}>
                    {countDate(searchHotel?.checkIn, searchHotel?.checkOut)} đêm
                </Text>

                <Flex vertical={true} align={"center"} className={"dates-booking-checkout"} wrap={"wrap"}>
                    <Text fontSize={"16px"} fontWeight={400}>
                        Nhận phòng
                    </Text>
                    <Text fontSize={"14px"} fontWeight={600}>
                        {searchHotel?.checkOut}
                    </Text>
                    <Text fontSize={"14px"} fontWeight={600}>
                        7:00 - 12:00
                    </Text>
                </Flex>
            </Flex>

            <div className={"room-services"}>
                <Text fontSize={"16px"} fontWeight={700}>
                    {roomDetailResponse?.roomTypeName}
                </Text>
                <Text fontSize={"16px"} fontWeight={400}>
                    {roomDetailResponse?.description}
                </Text>
                <Flex gap={6} vertical={true} style={{marginTop: "6px", paddingLeft: "6px"}}>
                    {/*{hotelServices.map((service, index) => (*/}
                    {/*    <Flex key={index} gap={6}>*/}
                    {/*        <Image src={service.icon}/>*/}
                    {/*        <Text fontSize={"16px"} fontWeight={400}>{service.name}</Text>*/}
                    {/*    </Flex>*/}
                    {/*))}*/}
                    <Text fontSize={"16px"} fontWeight={500}>
                        {roomDetailResponse?.bed ?? 1 } giường
                    </Text>
                    <Text fontSize={"16px"} fontWeight={500}>
                        {roomDetailResponse?.maxAdult ?? 1} người lớn
                    </Text>
                    <Text fontSize={"16px"} fontWeight={500}>
                        {roomDetailResponse?.maxChildren ?? 1} trẻ em
                    </Text>
                    <Text fontSize={"16px"} fontWeight={500}>
                        {roomDetailResponse?.area ?? 1} m<sup>2</sup>
                    </Text>
                </Flex>

            </div>

        </StyledSummaryBrooking>
    );
};
const StyledSummaryBrooking = styled(Flex)`
    .summary-price, .hotel-info, .room-services {
        padding: 12px;
        border-radius: 12px;
        background-color: ${appConfig.colors.background};
    }

    .hotel-info {
        .hotel-info-img {
            .hotel-main-img {
                width: 100%;
            }

            .hotel-description {
                width: 100%;
            }
        }

        @media (min-width: 992px) {
            .hotel-info-img {
                .hotel-main-img {
                    width: 35%;
                }

                .hotel-description {
                    width: 60%;
                }
            }
        }
    }


    .dates-booking {
        margin: 0 auto;

        .dates-booking-checkin, .dates-booking-checkout {
            margin: 0 12px;
            padding: 12px 24px;
            border-radius: 12px;
            border: 1px solid ${appConfig.colors.fadedTxt};
        }

        .dates-booking-totals {
            padding: 6px 24px;
            border-bottom: 1px solid ${appConfig.colors.fadedTxt};
        }
    }
`;