export const PublicSiteMap = {
    TEMPLATE: "/template",
    INDEX: "/",
    HOTELS: "/hotels",
    HOTEL_DETAIL: "/hotel/:id",
    BOOKING_STEP1: "/booking-step1",
    // BOOKING_STEP1: "/step1",
    BOOKING_STEP2: "/booking-step2",
    BOOKING_STEP3: "/booking-step3",
    BOOKING_RESULT: "/booking-result",
    PRODUCT_DETAIL_GEN: (id: string) => {
        return "/hotel/" + id + "/detail";
    },

}