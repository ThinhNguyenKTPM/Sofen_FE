import styled from "styled-components";
import {Flex, Radio, RadioChangeEvent} from "antd";
import Col from "components/layout/Col.tsx";
import {DetailPrice} from "public/components/Booking/DetailPrice.tsx";
import {Button} from "components/button/Button.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {SummaryBooking} from "public/components/Booking/SummaryBooking.tsx";
import {Container} from "public/containers/Container.tsx";
import {useState} from "react";
import {appConfig} from "app/config/AppConfig.ts";
import {SearchHotel} from "public/models/Search.ts";
import {RoomDetailResponse} from "public/models/Room.ts";
import {Title} from "components/typhograpy/Title.tsx";
import {BookingInfo} from "public/models/BookingInfo.ts";
import {useCreatBookingMutation} from "public/services/BookingServiceApi.ts";
import {Booking, BookingRoom} from "public/models/Booking.ts";
import {useAppSelector} from "app/store/hook.ts";

export const BookingStep3 = () => {
    const [createBooking] = useCreatBookingMutation();
    const {account} = useAppSelector((state) => state.auth);

    const searchHotelStr: string | null = localStorage.getItem("searchHotel");
    const searchHotel: SearchHotel = searchHotelStr ? JSON.parse(searchHotelStr) : null;

    const roomString = localStorage.getItem("room");
    const roomDetailResponse: RoomDetailResponse = roomString ? JSON.parse(roomString) : null;

    const bookingInfoStr = localStorage.getItem("bookingInfo");
    const bookingInfo: BookingInfo = bookingInfoStr ? JSON.parse(bookingInfoStr) : null;
    const handleButtonClick = () => {
        const room: BookingRoom = {
            id: roomDetailResponse?.id,
            price: roomDetailResponse?.price,
            amount: searchHotel?.roomAmount
        }
        const request: Booking = {
            userId: account ? account.id : undefined,
            hotelId: searchHotel?.hotelId,
            checkIn: searchHotel?.checkIn,
            checkOut: searchHotel?.checkOut,
            name: bookingInfo.fullName,
            email: bookingInfo.email,
            phone: bookingInfo.phoneNumber,
            phoneCode: "84",
            otherPersonName: bookingInfo.guestName,
            specialRequest: bookingInfo.specialRequest,
            pickUpLocation: bookingInfo.pickupLocation,
            adult: searchHotel.adults,
            children: searchHotel.children,
            rooms: [room]
        }
        createBooking(request)
            .unwrap()
            .then((res) => {
                console.log("res", res);
                window.location.href = res.url;
            })
            .catch((err) => {
                console.log("err", err);
            })
        ;

        console.log("click");
    }
    const [radioValue, setRadioValue] = useState(1);
    const radioOptions = [
        {
            label: "Thanh toán khi nhận phòng",
            value: 1
        },
        {
            label: "Ngân hàng nội địa (chưa hỗ trợ)",
            value: 2
        },
        {
            label: <StyledMomoPayment>
                <Text fontSize={"16px"} fontWeight={400}>
                    Thanh toán qua VNPay
                </Text>
                {/*<img src={radioValue === 3 ? "src/assets/Booking/Momo/momo-logo-active.svg" : ""} alt="src/assets/Booking/Momo/momo-logo-active.svg"/>*/}
            </StyledMomoPayment>,
            value: 3
        }
    ]
    const radioOnChange = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    return (
        <Container>

            <StyledBookingStep3>
                <Col md={14} className={"booking-step-3-right"}>
                    <SummaryBooking
                        searchHotel={searchHotel}
                        roomDetailResponse={roomDetailResponse}
                    />
                </Col>
                <Col md={10} className={"booking-step-3-left"}>
                    <div className={"booking-payment"}>
                        <Text fontSize={"20px"} fontWeight={700}>
                            Phương thức thanh toán
                        </Text>
                        <Radio.Group onChange={radioOnChange} value={radioValue} options={radioOptions}
                                     className={"radio-payment"}>
                        </Radio.Group>
                    </div>

                    <DetailPrice
                        searchHotel={searchHotel}
                        roomDetailResponse={roomDetailResponse}
                    />
                    <Flex gap={6} vertical={true} style={{marginTop: "6px", paddingLeft: "6px"}}>
                        <Title level={5}>
                            Thông tin khách
                        </Title>
                        <Text fontSize={"16px"} fontWeight={500}>
                            Tên: {bookingInfo.fullName}
                        </Text>
                        <Text fontSize={"16px"} fontWeight={500}>
                            Email: {bookingInfo.email}
                        </Text>
                        <Text fontSize={"16px"} fontWeight={500}>
                            Số điện thoại: {bookingInfo.phoneNumber}
                        </Text>
                    </Flex>
                    <Button type="primary" handleClickButton={handleButtonClick} className={"continue-button"}>
                        <Text fontSize={"20px"} fontWeight={700} color={"white"}>
                            Thanh toán
                        </Text>
                    </Button>

                </Col>

            </StyledBookingStep3>
        </Container>
    )
}
const StyledBookingStep3 = styled(Flex)`
    flex-direction: column;
    margin: 12px 0;
    gap: 12px;
    @media (min-width: 768px) {
        flex-direction: row;
    }

    .booking-step-3-left {
        .booking-payment {
            border-radius: 12px;
            background-color: ${appConfig.colors.background};
            padding: 12px;

            .radio-payment {
                display: flex;
                flex-direction: column;
            }

            margin-bottom: 24px;
        }

        .continue-button {
            margin-top: 12px;
            margin-bottom: 12px;
            padding: 12px 24px;
            width: 100%;
        }
    }
`;

const StyledMomoPayment = styled(Flex)`
    align-items: center;
    justify-content: space-between;
    gap: 6px;

    img {
        width: 16px;
        height: 16px;
    }
`;