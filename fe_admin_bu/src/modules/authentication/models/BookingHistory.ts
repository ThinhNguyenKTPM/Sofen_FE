export interface PaginationReq {
    page?: number;
    size?: number;
    sort?: string;
    direction?: string;
}

export interface BookingHistoryReq extends PaginationReq {
    status?: string;
    type?: string;
    hotelId?: string;
    userId?: string;
}
export interface BookingHistoryRes {
    hotelName: string;
    bookingId: string;
    userId: string;
    checkIn: string;
    checkOut: string;
    status: string;
    totalPrices: number;
    bookingDate: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    phoneCode: string;
    roomBookingInfos: RoomBookingInfo[];
}

export interface RoomBookingInfo{
    name: string;
    adult: number;
    price: number;
    amount: number;
    total: string;
    imageUrl: string;
}