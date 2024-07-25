export interface Room {
    roomName: string;
    roomBasePrice: number;
    discountPercent: number;
    bedType: string;
    bedAmount: number;
    totalCustomer: number;
    availableRoom: number;
    service: RoomService[];
}
interface RoomService {
    serviceName: string;
    serviceImage: string;

}

export interface RoomDetailResponse {
    id: number;
    remain: number;
    roomTypeName: string;
    area: number;
    bed: number;
    maxChildren: number;
    maxAdult: number;
    price: number;
    discount: number;
    description: string;
    images: RoomImage[];
    furnitures: IDetail[];
}

export interface IDetail {
    name: string;
    description: string;
}

export interface RoomImage {
    id: number;
    alt: string;
    url: string;
    isMain: boolean;
    status: string;
}
