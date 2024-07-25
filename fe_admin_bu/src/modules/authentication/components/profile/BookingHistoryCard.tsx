import styled from "styled-components";
import {Flex, Image, Tag} from "antd";
import {Title} from "components/typhograpy/Title.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {CheckOutlined, CloseOutlined, ExclamationOutlined, WarningOutlined} from "@ant-design/icons";
import {Button} from "components/button/Button.tsx";
import {useTranslation} from "react-i18next";
import {Currency} from "components/currency/Currency.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {BookingHistoryRes} from "authentication/models/BookingHistory.ts";

export interface BookingHistoryCardProps {
    bookingCard: BookingHistoryRes;
}

export const BookingHistoryCard = ({bookingCard}: BookingHistoryCardProps) => {
    const {t} = useTranslation();
    let statusColor = "#87d068";
    let statusIcon = <CheckOutlined/>;
    switch (bookingCard.status) {
        case "PENDING":
            statusColor = "#2db7f5";
            statusIcon = <ExclamationOutlined/>;
            break;
        case "SUCCESS":
            statusColor = "#87d068";
            statusIcon = <CheckOutlined/>;
            break;
        case "CANCEL":
            statusColor = " #ff0000";
            statusIcon = <CloseOutlined/>;
            break;
        default:
            statusColor = "#dc3545";
            statusIcon = <WarningOutlined/>;
            break;
    }
    return (
        <StyledBookingHistoryCard vertical={true}>
            <StyledBookingHistoryCardHeader vertical={false} wrap={"wrap"}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                justifyContent: "flex-start",
                                                alignItems: "center"
                                            }}
            >
                <Title level={5}>
                    {bookingCard.hotelName}
                </Title>
                <Text fontSize={"16px"} fontWeight={500}>
                    ( Check-in:
                    <Text fontSize={"16px"} fontWeight={600} color={appConfig.colors.primary}>
                        {bookingCard.checkIn}
                    </Text>

                    - Check-out:
                    <Text fontSize={"16px"} fontWeight={600} color={appConfig.colors.primary}>
                        {bookingCard.checkOut}
                    </Text> )
                </Text>
                <StyledTag color={statusColor}>
                    {statusIcon}
                    <Text fontSize={"13px"} fontWeight={600} color={"#fff"}>
                        {bookingCard.status}
                    </Text>
                </StyledTag>
            </StyledBookingHistoryCardHeader>

            <StyledBookingHistoryCardContent wrap={"wrap"}>
                <Flex vertical={true} gap={6} >
                    {
                        bookingCard.roomBookingInfos.map((roomBookingInfo) => (
                            <Flex gap={12} wrap={"wrap"}>
                                <StyledImage src={roomBookingInfo.imageUrl} alt="" width={120} height={120}/>
                                <Flex vertical={true} gap={6} >
                                    <Text fontSize={"18px"} fontWeight={600}>
                                        {roomBookingInfo.name}
                                    </Text>
                                    <Text fontSize={"16px"} fontWeight={600} >
                                        <Currency price={roomBookingInfo.price}/>
                                        <Text fontSize={"16px"} fontWeight={600}>
                                            {t('hotelPage.roomCard.price')}

                                        </Text>
                                    </Text>
                                    <Text fontSize={"16px"} fontWeight={400}>
                                        Room: {roomBookingInfo.amount}
                                    </Text>
                                    <Text fontSize={"16px"} fontWeight={400}>
                                        Adults: {roomBookingInfo.adult}
                                    </Text>
                                    <Text fontSize={"16px"} fontWeight={400}>
                                        Amount: {roomBookingInfo.amount}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))
                    }
                </Flex>
                <Flex vertical={true} gap={6} style={{
                    flexGrow: 1,
                    marginLeft: "auto",
                    marginRight: "20px"
                }}>
                    <Flex>
                        <Flex vertical={true} gap={6} style={{
                            width: "100px"
                        }}>
                            <Text fontSize={"16px"} fontWeight={400}>
                                Full name:
                            </Text>
                            <Text fontSize={"16px"} fontWeight={400}>
                                Email:
                            </Text>
                            <Text fontSize={"16px"} fontWeight={400}>
                                Phone:
                            </Text>
                            <Text fontSize={"16px"} fontWeight={400}>
                                Amount:
                            </Text>
                            <Text fontSize={"16px"} fontWeight={400}>
                                Total:
                            </Text>
                        </Flex>
                        <Flex vertical={true} gap={6} style={{
                            flexGrow: 1
                        }}>
                            <Text fontSize={"16px"} fontWeight={600}>
                                {bookingCard.fullName}
                            </Text>
                            <Text fontSize={"16px"} fontWeight={600}>
                                {bookingCard.email}
                            </Text>
                            <Text fontSize={"16px"} fontWeight={600}>
                                {bookingCard.phoneNumber}
                            </Text>
                            <Text fontSize={"16px"} fontWeight={600}>
                                {bookingCard.bookingDate}
                            </Text>
                            <Text fontSize={"16px"} fontWeight={700} color={appConfig.colors.primary}>
                                <Currency price={bookingCard.totalPrices}/>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </StyledBookingHistoryCardContent>


            <Flex>
                <Button buttonType={"reverse-primary"} style={{
                    marginLeft: "auto",
                    height: "30px"
                }}>
                    <Text fontSize={"14px"} fontWeight={500} color={appConfig.colors.primary}>
                        View Detail
                    </Text>
                </Button>
            </Flex>


        </StyledBookingHistoryCard>
    );
}

const StyledBookingHistoryCard = styled(Flex)`
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    padding: 10px 30px;
    margin-bottom: 12px;
`;

const StyledTag = styled(Tag)`
    height: 30px;
    width: 100px;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 10px 20px;
`;
const StyledBookingHistoryCardHeader = styled(Flex)`
    margin-top: 5px;
    gap: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #f0f0f0;
`;
const StyledBookingHistoryCardContent = styled(Flex)`
    margin-top: 12px;
    gap: 24px;
    width: 100%;
    flex-grow: 1;
`;
const StyledImage = styled(Image)`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
`