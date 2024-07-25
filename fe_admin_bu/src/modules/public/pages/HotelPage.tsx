import {MainPage} from "public/pages/PublicPage.tsx";
import {HotelCardContent} from "public/components/Hotel/Card/HotelCardContent.tsx";
import {Container} from "public/containers/Container.tsx";
import {HotelImages} from "public/components/Hotel/HotelIamges.tsx";
import {HotelInfo} from "public/components/Hotel/HotelInfo.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {HotelRooms} from "public/containers/Hotel/HotelRooms.tsx";
import {useLocation} from "react-router-dom";
import {getParamsUrl, SearchHotel} from "public/models/Search.ts";
import {useGetHotelDetailByIdQuery} from "public/services/HotelServiceApi.ts";
import {useEffect} from "react";
import {SearchForm} from "public/components/Modal/SearchForm.tsx";
import {useFormik} from "formik";
import {getNextDate, toDateString} from "public/utils/DateUtils.ts";
import * as yup from "yup";
import {LoaderBig} from "components/LoadingBig.tsx";
import styled from "styled-components";

export const HotelPage = () => {
    const location = useLocation();
    // const filter = location as SearchHotel;
    const searchParams = new URLSearchParams(location.search);
    const filter = getParamsUrl(searchParams);
    console.log(filter);
    const lang = localStorage.getItem("lang");
    const {data: hotelDetail, isLoading, refetch} = useGetHotelDetailByIdQuery(filter.hotelId);

    const current = new Date();
    const formik = useFormik({
        validateOnBlur: true,
        validateOnChange: true,
        initialValues: {
            checkIn: toDateString(getNextDate(current)),
            checkOut: toDateString(getNextDate(getNextDate(current))),
            adults: 2,
            children: 0,
            fromPrice: 0,
            toPrice: 0,
            roomAmount: 1,
            hotelId: ""
        } as SearchHotel,
        validationSchema: yup.object().shape({
            checkIn: yup.date().required("Check in date is required"),
            checkOut: yup.date().required("Check out date is required"),
            adults: yup.number().min(1, "At least 1 adult").required("Adults is required"),
            children: yup.number().min(0, "Children must be greater than or equal to 0").required("Children is required"),
            fromPrice: yup.number().min(0, "Price must be greater than or equal to 0").required("From price is required"),
            toPrice: yup.number().min(0, "Price must be greater than or equal to 0").required("To price is required"),
            roomAmount: yup.number().min(1, "At least 1 room").required("Room amount is required"),
            hotelId: yup.string()
                .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, "Vui long chon hotel")
                .required("Hotel is required")
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });
    const onChangeHotelName = (value: string) => {
        formik.setFieldValue("hotelId", value);
    }
    const onChangeCheckInDate = (value: string) => {
        formik.setFieldValue("checkIn", value);
        console.log(formik.values);
    }
    useEffect(() => {
        refetch();
    }, [lang]);
    console.log(hotelDetail);
    const images = hotelDetail?.images;
    const mainImage = images?.find(image => image.isMain);
    const otherImages = images?.filter(image => !image.isMain);
    return (
        <MainPage>
            <Container backgroundColor={appConfig.appBgr}>

                    <StyledSearchForm>
                        <SearchForm
                            isDisplayHotelName={false}
                            formik={formik}
                            onChangeHotelName={onChangeHotelName}
                            onChangeCheckInDate={onChangeCheckInDate}
                        />
                    </StyledSearchForm>
                {
                    isLoading ? (
                        <StyledLoader>
                            <LoaderBig/>
                        </StyledLoader>
                    ) : (
                        <>
                            <div>
                                <HotelCardContent
                                    isDetailHotel={true}
                                    screenSize={"screen-xl"}
                                    hotelDetail={hotelDetail}
                                />
                                {
                                    images && mainImage && otherImages &&
                                    <HotelImages
                                        mainImage={mainImage}
                                        otherImages={otherImages}
                                    />
                                }

                                <HotelInfo hotelInfo={hotelDetail?.hotelDescription ?? ""}/>
                            </div>
                            <HotelRooms
                                filter={filter}
                                hotelName={hotelDetail?.hotelName ?? ""}
                            />
                        </>
                    )
                }


            </Container>
        </MainPage>

    )
        ;
}

const StyledSearchForm = styled.div`
    //position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${appConfig.colors.background};
`;

const StyledLoader = styled.div`
    height: 80vh;
`