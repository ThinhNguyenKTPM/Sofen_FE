export interface SearchHotel{
    hotelId: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    fromPrice: number;
    toPrice: number;
    roomAmount: number;
}
// export const setParams = (params: SearchHotel) => {
//
// }
export const getParamsUrl = (query: URLSearchParams) => {
    const filter = {} as SearchHotel;
    filter.hotelId = query.get("hotelId") || '';
    filter.checkIn = query.get("checkIn") || '';
    filter.checkOut = query.get("checkOut") || '';
    filter.adults = query.get("adults") ? Number(query.get("adults")) : 0;
    filter.children = query.get("children") ? Number(query.get("children")) : 0;
    filter.fromPrice = query.get("fromPrice") ? Number(query.get("fromPrice")) : 0;
    filter.toPrice = query.get("toPrice") ? Number(query.get("toPrice")) : 0;
    filter.roomAmount = query.get("roomAmount") ? Number(query.get("roomAmount")) : 0;
    return filter;
};
