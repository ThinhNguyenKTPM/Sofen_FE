import styled from "styled-components";
import {Container} from "public/containers/Container.tsx";
import Col from "components/layout/Col.tsx";
import {DetailPrice} from "public/components/Booking/DetailPrice.tsx";
import {Button} from "components/button/Button.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {SummaryBooking} from "public/components/Booking/SummaryBooking.tsx";
import {ContactInfo} from "public/components/Booking/ContactInfo.tsx";
import {Flex} from "antd";
import {RoomDetailResponse} from "public/models/Room.ts";
import {SearchHotel} from "public/models/Search.ts";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";
import {useNavigate} from "react-router-dom";

export const BookingStep2 = () => {
    const navigate = useNavigate();
    const searchHotelStr: string | null = localStorage.getItem("searchHotel");
    const searchHotel: SearchHotel = searchHotelStr ? JSON.parse(searchHotelStr) : null;

    const roomString = localStorage.getItem("room");
    const roomDetailResponse: RoomDetailResponse = roomString ? JSON.parse(roomString) : null;
    const bookingInfoStr = localStorage.getItem("bookingInfo");
    const bookingInfo = bookingInfoStr ? JSON.parse(bookingInfoStr) : null;
    const handleButtonClick = () => {
        navigate(PublicSiteMap.BOOKING_STEP3);
    }
    return (
        <Container>
            <StyledBookingStep2>
                <Col md={10} className={"booking-step-2-right"}>

                    <SummaryBooking
                        searchHotel={searchHotel}
                        roomDetailResponse={roomDetailResponse}
                    />

                </Col>
                <Col md={14} className={"booking-step-2-left"}>
                    <ContactInfo
                        bookingInfo={bookingInfo}
                    />
                    <div className={"continue-next-step"}>
                        <DetailPrice
                            searchHotel={searchHotel}
                            roomDetailResponse={roomDetailResponse}
                        />
                        <Button type="primary" handleClickButton={handleButtonClick} className={"continue-button"}>
                            <Text fontSize={"20px"} fontWeight={700} color={"white"}>
                                Nhấn để tiếp tục
                            </Text>
                        </Button>
                    </div>
                </Col>

            </StyledBookingStep2>
        </Container>
    )
}
const StyledBookingStep2 = styled(Flex)`
    flex-direction: column;
    margin: 12px 0;
    gap: 12px;

    .booking-step-2-left {
        .continue-button {
            margin-top: 12px;
            padding: 12px 24px;
            width: 100%;
        }
    }

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;