import {RouteObject} from "react-router-dom";
import {PublicSiteMap} from "./PublicSiteMap.ts";
import {TemplatePage} from "../pages/TemplatePage.tsx";
import {HotelPage} from "public/pages/HotelPage.tsx";
import {BookingPageStep1} from "public/pages/BookingPageStep1.tsx";
import {BookingPageStep2} from "public/pages/BookingPageStep2.tsx";
import {BookingPageStep3} from "public/pages/BookingPageStep3.tsx";
import {BookingResult} from "public/pages/BookingResult.tsx";
import {LoginPage} from "authentication/pages/LoginPage.tsx";

export const PUBLIC_ROUTERS: RouteObject[] = [
    {path: PublicSiteMap.TEMPLATE, element: <TemplatePage/>},
    {path: PublicSiteMap.INDEX, element: <LoginPage/>},
    {path: PublicSiteMap.HOTELS, element: <LoginPage/>},
    {path: PublicSiteMap.BOOKING_STEP1, element: <BookingPageStep1/>},
    {path: PublicSiteMap.BOOKING_STEP2, element: <BookingPageStep2/>},
    {path: PublicSiteMap.BOOKING_STEP3, element: <BookingPageStep3/>},
    {path: PublicSiteMap.BOOKING_RESULT, element: <BookingResult/>},

    {path: PublicSiteMap.HOTEL_DETAIL, element: <HotelPage/>},
    // {
    //     path: "/booking", element: <BookingPage/>
    //     , children: [
    //         {path: "/step1", element: <BookingPageStep1/>},
    //     ]
    // }
];