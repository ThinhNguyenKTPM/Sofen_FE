import {PaginationReq} from "authentication/models/BookingHistory.ts";

export interface HotelFilterReq extends PaginationReq {
    status?: string;
    hotelId?: string;
}