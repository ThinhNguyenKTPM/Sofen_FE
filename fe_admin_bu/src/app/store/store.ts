import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import rootReducer from "app/store/reducer.ts";
import {hotelServiceApi} from "public/services/HotelServiceApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import {roomServiceApi} from "public/services/RoomServiceApi.ts";
import authApi from "authentication/services/AuthSerivceApi.ts";
import resetPasswordServiceApi from "authentication/services/ResetPasswordService.ts";
import accountServiceApi from "authentication/services/AccountService.ts";
import bookingServiceApi from "public/services/BookingServiceApi.ts";
import BookingHistoryApi from "authentication/services/BookingHistoryService.ts";
import BookingManagementService from "@/modules/admin/services/BookingManagementService.ts";
import UserManagementService from "@/modules/admin/services/UserManagementService.ts";
import {HotelManagementService} from "@/modules/admin/services/HotelManagementService.ts";
import HotelServiceManagement from "@/modules/admin/services/HotelServiceManagement.ts";

export function makeStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(hotelServiceApi.middleware)
                .concat(roomServiceApi.middleware)
                .concat(authApi.middleware)
                .concat(resetPasswordServiceApi.middleware)
                .concat(accountServiceApi.middleware)
                .concat(bookingServiceApi.middleware)
                .concat(BookingHistoryApi.middleware)
                .concat(BookingManagementService.middleware)
                .concat(UserManagementService.middleware)
                .concat(HotelManagementService.middleware)
                .concat(HotelServiceManagement.middleware)
    });
}
const store = makeStore();
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;
export default store;