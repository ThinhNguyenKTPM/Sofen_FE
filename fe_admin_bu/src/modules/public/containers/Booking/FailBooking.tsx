import {Title} from "components/typhograpy/Title.tsx";
import {Flex, Image} from "antd";
import styled from "styled-components";
import {Text} from "components/typhograpy/Text.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {Button} from "components/button/Button.tsx";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const FailBooking = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <StyledSuccessBooking vertical={true} align={"center"}>
            <Title level={2} color={"#D64E4E"} className={"fail-booking-title"}>
                {t("bookingStatus.fail.header")}
            </Title>
            <Image src={"src/assets/Booking/fail-booking.svg"} alt={"success-booking"} preview={false}/>
            <Text fontSize={"18px"}>
                {t("bookingStatus.fail.title")}
            </Text>
            <Paragraph fontSize={"16px"} color={"#000000"}>
                {t("bookingStatus.fail.text1")}
                <Text fontSize={"16px"} fontWeight={700} color={appConfig.colors.primary} style={{padding: "0px 3px"}}>
                    1900 1234
                </Text>
                {t("bookingStatus.fail.text2")}

                <Text fontSize={"16px"} fontWeight={700} color={appConfig.colors.primary} style={{padding: "0px 3px"}}>
                    thinhnguyen@gmail.com
                </Text>
                {t("bookingStatus.fail.text3")}
            </Paragraph>
            <Button buttonType={"primary"} className={"back-to-homepage"} onClick={() => {
                navigate(PublicSiteMap.INDEX)
            }}>
                {t("bookingStatus.fail.button")}
            </Button>
        </StyledSuccessBooking>
    );
}
const StyledSuccessBooking = styled(Flex)`
    padding: 12px;
    gap: 12px;

    .fail-booking-title {
        margin-bottom: 50px;
    }

    .ant-image {
        width: 300px;
        margin-bottom: 20px;
    }

    .back-to-homepage {
        padding: 12px 0;
        width: 250px;
        font-size: 20px;
        font-weight: 700;
    }
`;