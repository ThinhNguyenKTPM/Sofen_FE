import {useLocation, useNavigate} from "react-router-dom";
import {VnpayReturnParams} from "public/models/Booking.ts";
import {useEffect, useState} from "react";
import {usePaymentReturnQuery} from "public/services/BookingServiceApi.ts";
import {SuccessBooking} from "public/containers/Booking/SuccessBooking.tsx";
import {FailBooking} from "public/containers/Booking/FailBooking.tsx";
import {MainPage} from "public/pages/PublicPage.tsx";

export const BookingResult = () => {
    const [result, setIsLoading] = useState(0);

    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const parsedParams: VnpayReturnParams = {} as VnpayReturnParams;
    for (const [key, value] of params.entries()) {
        parsedParams[key as keyof VnpayReturnParams] = value;
    }

    const {data: response, isLoading, isError} = usePaymentReturnQuery(parsedParams);
    useEffect(() => {

    }, [response]);
    console.log("response", response);
    return (
        <MainPage>
            {isLoading ? <SuccessBooking email={"thesofen@gmail.com"}/> :
                (
                    (isError && <FailBooking/>) ||
                    (response && response.message !== "" && <SuccessBooking email={response.message}/>)

                )
            }
        </MainPage>
    );
}