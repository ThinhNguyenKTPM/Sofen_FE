import {Title} from "components/typhograpy/Title.tsx";
import {Flex, Image} from "antd";
import styled from "styled-components";
import {Text} from "components/typhograpy/Text.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {useTranslation} from "react-i18next";

export interface SuccessBookingProps {
    email: string;
}
export const SuccessBooking = ({email} : SuccessBookingProps) => {
    const {t} = useTranslation();

    return (
        <StyledSuccessBooking vertical={true} align={"center"}>
            <Title level={2} color={"#8bcc44"} className={"success-booking-title"}>
                {t('bookingStatus.success.header')}
            </Title>
            <Image src={"src/assets/Booking/success-booking.svg"} alt={"success-booking"} preview={false}/>
            <Text fontSize={"18px"} >
                {t('bookingStatus.success.title')}
            </Text>
            <Paragraph fontSize={"16px"} color={"#000000"}>
                {t('bookingStatus.success.text1')}
                <Text fontSize={"16px"} fontWeight={500} color={appConfig.colors.primary} style={{padding: "0px 3px"}}>
                    {email}
                </Text>
                {t('bookingStatus.success.text2')}
            </Paragraph>
        </StyledSuccessBooking>
    );
}
const StyledSuccessBooking = styled(Flex)`
    padding: 12px;
    gap: 12px;
    .success-booking-title{
        margin-bottom: 50px;
    }
    .ant-image {
        width: 300px;
        margin-bottom: 20px;
    }
`;