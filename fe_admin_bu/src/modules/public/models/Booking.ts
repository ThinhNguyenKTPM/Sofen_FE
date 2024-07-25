export interface Booking {
    // id: string;
    userId?: string;
    hotelId: string;
    name: string;
    email: string;
    phone: string;
    phoneCode: string;
    otherPersonName: string;
    specialRequest: string;
    pickUpLocation: string;
    checkIn: string; // hoặc có thể sử dụng kiểu Date nếu bạn đã chuyển đổi từ LocalDate
    checkOut: string; // hoặc có thể sử dụng kiểu Date nếu bạn đã chuyển đổi từ LocalDate
    adult: number;
    children: number;
    rooms: BookingRoom[];
}

// Interface cho dữ liệu phòng đặt
export interface BookingRoom {
    id: number;
    price: number;
    amount: number;
}

export interface BookingResponse {
    url: string;
}

export interface MessageResponse {
    message: string;
}

export interface VnpayReturnParams {
    vnp_Amount: string;
    vnp_BankCode: string;
    vnp_BankTranNo: string;
    vnp_CardType: string;
    vnp_OrderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: string;
    vnp_TransactionStatus: string;
    vnp_TxnRef: string;
    vnp_SecureHash: string;
}