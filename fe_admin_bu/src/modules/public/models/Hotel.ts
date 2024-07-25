export interface HotelName{
    id: string
    name: string;
}

// TypeScript equivalent of HotelDetailResponse
export interface HotelDetailResponse {
    hotelName: string;
    hotelDescription: string;
    hotelAddress: string;
    fromPrice: number;
    images: HotelImage[];
    services: IServiceResponse[];
    policies: IPolicyResponse[];
}

// TypeScript equivalent of HotelImage
export interface HotelImage {
    id: number;
    url: string;
    isMain: boolean;
    alt: string;
}

// TypeScript equivalent of IServiceResponse
export interface IServiceResponse {
    price: number;
    name: string;
    description: string;
}

// TypeScript equivalent of IPolicyResponse
export interface IPolicyResponse {
    name: string;
    description: string;
}



