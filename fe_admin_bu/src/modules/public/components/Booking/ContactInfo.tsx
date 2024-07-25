import styled from "styled-components";
import {Flex} from "antd";
import {appConfig} from "app/config/AppConfig.ts";
import {Text} from "components/typhograpy/Text.tsx";
import {useTranslation} from "react-i18next";
import {BookingInfo} from "public/models/BookingInfo.ts";

export interface ContactInfoProps {
    bookingInfo: BookingInfo;
}

export const ContactInfo = ({bookingInfo} : ContactInfoProps) => {
    const {t} = useTranslation();
    // const bookingInfo = {
    //     fullName: "Nguyễn Lê Phú Thịnh",
    //     phoneNumber: "+84999999999",
    //     email: "thinhnguyen@gmail.com",
    //     guestName: "Nguyễn Lê Phú Thịnh",
    //     specialRequest: "Không có",
    //     discountCode: "ABCZYX",
    //     pickupLocation: "lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, ad alias aliquam aspernatur atque autem beatae commodi consequatur cumque cupiditate debitis delectus doloremque doloribus ducimus ea eius eligendi eos error et ex exercitationem explicabo facere fugiat fugit harum id illum impedit in incidunt ipsa ipsam ipsum iure laboriosam laborum laudantium magnam maxime minima minus molestias natus nemo neque nihil nisi nobis non nulla numquam obcaecati odio officiis omnis optio pariatur perferendis perspiciatis placeat possimus praesentium provident quae quas quia quibusdam quisquam quo ratione recusandae rem repellat repudiandae rerum saepe sapiente sequi similique sit soluta sunt suscipit tempora tenetur totam ullam unde vel veniam veritatis voluptas voluptates voluptatum\","
    // } as BookingInfo;
    return (
        <StyledContactInfoForm justify={"center"} vertical={true}>
            <StyledFormTitle>
                <Text fontSize="20px" fontWeight={700}>
                    {t('bookingForm.title')}
                </Text>
            </StyledFormTitle>

            <StyledInfoGroup>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.name')}:
                </Text>
                <Text fontSize="16px" fontWeight={400} className={"info-text"}>
                    {bookingInfo.fullName}
                </Text>
            </StyledInfoGroup>

            <StyledInfoGroup>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.email')}:
                </Text>
                <Text fontSize="16px" fontWeight={400} className={"info-text"}>
                    {bookingInfo.email}
                </Text>
            </StyledInfoGroup>

            <StyledInfoGroup>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.phone')}:
                </Text>
                <Text fontSize="16px" fontWeight={400} className={"info-text"}>
                    {bookingInfo.phoneNumber}
                </Text>
            </StyledInfoGroup>
            <StyledInfoGroup>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.guestName')}:
                </Text>
                <Text fontSize="16px" fontWeight={400} className={"info-text"}>
                    {bookingInfo.guestName}
                </Text>
            </StyledInfoGroup>
            <StyledInfoGroup>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.discountCode')}:
                </Text>
                <Text fontSize="16px" fontWeight={400} className={"info-text"}>
                    {bookingInfo.discountCode}
                </Text>
            </StyledInfoGroup>
            <StyledInfoGroup className={"contact-info-paragraph"}>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.specialRequest')}:
                </Text>
                <Text fontSize="16px" fontWeight={400} className={"info-text"}>
                    {bookingInfo.specialRequest}
                </Text>
            </StyledInfoGroup>

            <StyledInfoGroup className={"contact-info-paragraph"}>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.pickUpDestination')}:
                </Text>
                <Text fontSize="16px" fontWeight={400} className={"info-text"}>
                    {bookingInfo.pickupLocation}
                </Text>
            </StyledInfoGroup>
        </StyledContactInfoForm>
    );
}

const StyledContactInfoForm = styled(Flex)`
    margin-bottom: 6px;
    padding: 6px 12px;
    border-radius: 12px;
    background-color: ${appConfig.colors.background};
`;
const StyledFormTitle = styled.div`
    margin-bottom: 6px;
`;

const StyledInfoGroup = styled.div`
    display: flex;
    flex-grow: 1;
    gap: 10px;
    margin: 6px 0;
    &.contact-info-paragraph{
        flex-direction: column;
        .info-text {
            width: 100%;
        }
    }
    .info-text {
        width: 60%;
        margin-right: 0;
        margin-left: auto;
    }
        
`;