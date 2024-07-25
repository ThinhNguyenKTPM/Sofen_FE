import {BookingStep1} from "public/containers/Booking/BookingStep1.tsx";
import {BookingInfo} from "public/models/BookingInfo.ts";
import {SearchHotel} from "public/models/Search.ts";
import {RoomDetailResponse} from "public/models/Room.ts";
import {createContext, useContext} from "react";
import {MainPage} from "public/pages/PublicPage.tsx";

export interface HotelContextType {
    searchHotel: SearchHotel | null;
    roomDetailResponse: RoomDetailResponse | null;
    // setSearchHotel: (data: SearchHotel | null) => void;
    // setRoomDetailResponse: (data: RoomDetailResponse | null) => void;
}

export const HotelContext = createContext<HotelContextType>({
    searchHotel: null,
    roomDetailResponse: null,
    // setSearchHotel: () => {},
    // setRoomDetailResponse: () => {},
});
export const useHotelBooking = () => useContext(HotelContext);
export const BookingPageStep1 = () => {
    window.scrollTo(0, 0);
    const searchHotelStr: string | null = localStorage.getItem("searchHotel");
    const searchHotel: SearchHotel = searchHotelStr ? JSON.parse(searchHotelStr) : null;

    const roomString = localStorage.getItem("room");
    const roomDetailResponse: RoomDetailResponse = roomString ? JSON.parse(roomString) : null;

    return (
        <MainPage>
            {/*<Route path={PublicSiteMap.BOOKING_STEP1}>*/}

            <HotelContext.Provider value={{searchHotel, roomDetailResponse}}>

                <BookingStep1 onSuccess={(data: BookingInfo) => {
                    console.log(data);
                }}/>
            </HotelContext.Provider>


            {/*</Route>*/}
        </MainPage>

    )
}