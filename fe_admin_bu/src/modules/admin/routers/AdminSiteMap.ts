export const AdminSiteMap = {
    INDEX: "/admin",
    BOOKINGS_MANAGEMENT: "/admin/bookings",
    HOTELS_MANAGEMENT: "/admin/hotels",
    ROOM_MANAGEMENT: "/admin/rooms",
    SERVICES_MANAGEMENT: "/admin/services",
    POLICIES_MANAGEMENT: "/admin/policies",
    CUSTOMERS_MANAGEMENT: "/admin/customers",
    EMPLOYEES_MANAGEMENT: "/admin/employees",
    FURNITURE_ROOM: "/admin/furniture-room",
    HOTEL_DETAIL: "/admin/hotels/:id",
    HOTEL_DETAIL_GEN: (id: number) => {
        return "/admin/hotels/" + id;
    },
    NOT_FOUND: "/*"
};