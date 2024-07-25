import {MainPage} from "public/pages/PublicPage.tsx";
import {SearchHotel} from "public/models/Search.ts";
import {RoomDetailResponse} from "public/models/Room.ts";
import {HotelContextType} from "public/pages/BookingPageStep1.tsx";
import {createContext} from "react";
import {BookingStep3} from "public/containers/Booking/BookingStep3.tsx";

export const HotelContext = createContext<HotelContextType>({
    searchHotel: null,
    roomDetailResponse: null,
    // setSearchHotel: () => {},
    // setRoomDetailResponse: () => {},
});
export const BookingPageStep3 = () => {
    const bookingInfo = localStorage.getItem("bookingInfo");
    console.log("Booking Info", bookingInfo);
    window.scrollTo(0, 0);
    const searchHotelStr: string | null = localStorage.getItem("searchHotel");
    const searchHotel: SearchHotel = searchHotelStr ? JSON.parse(searchHotelStr) : null;

    const roomString = localStorage.getItem("room");
    const roomDetailResponse: RoomDetailResponse = roomString ? JSON.parse(roomString) : null;

    return (
        <MainPage>
            <HotelContext.Provider value={{searchHotel, roomDetailResponse}}>
                <BookingStep3/>
            </HotelContext.Provider>
        </MainPage>
    )
}