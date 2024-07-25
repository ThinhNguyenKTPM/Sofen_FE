import styled from "styled-components";
import {FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import {ContactInfoForm} from "public/components/Booking/ContactInfoForm.tsx";
import {Button} from "components/button/Button.tsx";
import Col from "components/layout/Col.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {Flex} from "antd";
import {Container} from "public/containers/Container.tsx";
import {DetailPrice} from "public/components/Booking/DetailPrice.tsx";
import {SummaryBooking} from "public/components/Booking/SummaryBooking.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Link, useNavigate} from "react-router-dom";
import {appConfig} from "app/config/AppConfig.ts";
import {useTranslation} from "react-i18next";
import {BookingInfo} from "public/models/BookingInfo.ts";
import {useHotelBooking} from "public/pages/BookingPageStep1.tsx";
import {useEffect} from "react";
import {useAppSelector} from "app/store/hook.ts";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";

export interface BookingStep1Props {
    onSuccess: (data: BookingInfo) => void;
}

export const BookingStep1 = ({onSuccess}: BookingStep1Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {searchHotel, roomDetailResponse} = useHotelBooking();
    console.log("Context", searchHotel);
    const {account} = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (account) {
            formik.setFieldValue("fullName", account?.fullName);
            formik.setFieldValue("email", account?.email);
            formik.setFieldValue("phoneNumber", account?.phoneNumber);
        }
    }, [account]);
    const formik = useFormik({
            validateOnBlur: true,
            initialValues: {
                fullName: "",
                phoneNumber: "",
                email: "",
                guestName: "",
                specialRequest: "",
                discountCode: "",
                pickupLocation: "",
            } as BookingInfo,
            validationSchema: yup.object().shape({
                fullName: yup.string().trim().required(`${t('bookingForm.error.nameRequired')}`),
                email: yup.string().trim().email(`${t('bookingForm.error.emailInvalid')}`).required(`${t('bookingForm.error.emailRequired')}`),
                phoneNumber: yup.string().trim().required(`${t('bookingForm.error.phoneRequired')}`),
                guestName: yup.string().trim(),
            }),
            onSubmit: (values) => {
                onSuccess(values);
            },
        }
    );

    const handleButtonClick = () => {
        formik.handleSubmit();
        formik.submitForm();
        localStorage.setItem("bookingInfo", JSON.stringify(formik.values));
        navigate(PublicSiteMap.BOOKING_STEP2);
    };
    return (
        <Container>
            <StyledBookingStep1>
                <Col md={10} className={"booking-step-1-right"}>
                    <SummaryBooking
                        searchHotel={searchHotel}
                        roomDetailResponse={roomDetailResponse}
                    />
                </Col>
                <Col md={14} className={"booking-step-1-left"}>
                    <FormikProvider value={formik}>
                        <ContactInfoForm/>
                    </FormikProvider>
                    <DetailPrice
                        searchHotel={searchHotel}
                        roomDetailResponse={roomDetailResponse}
                    />
                    <Button type="primary" handleClickButton={handleButtonClick} className={"continue-button"}>
                        <Text fontSize={"20px"} fontWeight={700} color={"white"}>
                            {t('bookingForm.button')}
                        </Text>
                    </Button>
                    <Paragraph fontSize={"14px"} color={appConfig.colors.txt}
                               style={{textAlign: "center", marginTop: "12px"}}
                    >
                        {t('bookingForm.term1')}
                        <Link to={"#"}>{t('bookingForm.term2')}</Link>
                        {t('bookingForm.term3')}
                        <Link to={"#"}>{t('bookingForm.term4')}</Link>{t('bookingForm.term5')}
                    </Paragraph>
                </Col>
            </StyledBookingStep1>
        </Container>
    )
};
const StyledBookingStep1 = styled(Flex)`
    flex-direction: column;
    margin: 12px 0;
    gap: 12px;

    .booking-step-1-left {
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