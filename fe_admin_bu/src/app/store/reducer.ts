import {combineReducers} from "@reduxjs/toolkit";
import appSlice from "app/store/slice/appSlice.tsx";
import {hotelServiceApi} from "public/services/HotelServiceApi.ts";
import {roomServiceApi} from "public/services/RoomServiceApi.ts";
import authApi from "authentication/services/AuthSerivceApi.ts";
import resetPasswordServiceApi from "authentication/services/ResetPasswordService.ts";
import {authReducer} from "app/store/slice/authSlice.tsx";
import accountServiceApi from "authentication/services/AccountService.ts";
import bookingServiceApi from "public/services/BookingServiceApi.ts";
import BookingHistoryApi from "authentication/services/BookingHistoryService.ts";
import BookingManagementService from "@/modules/admin/services/BookingManagementService.ts";
import UserManagementService from "@/modules/admin/services/UserManagementService.ts";
import {HotelManagementService} from "@/modules/admin/services/HotelManagementService.ts";
import HotelServiceManagement from "@/modules/admin/services/HotelServiceManagement.ts";

export const rootReducer = combineReducers({
    appSlice: appSlice,
    auth: authReducer,
    [hotelServiceApi.reducerPath]: hotelServiceApi.reducer,
    [roomServiceApi.reducerPath]: roomServiceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [resetPasswordServiceApi.reducerPath]: resetPasswordServiceApi.reducer,
    [accountServiceApi.reducerPath]: accountServiceApi.reducer,
    [bookingServiceApi.reducerPath]: bookingServiceApi.reducer,
    [BookingHistoryApi.reducerPath]: BookingHistoryApi.reducer,
    [BookingManagementService.reducerPath]: BookingManagementService.reducer,
    [UserManagementService.reducerPath]: UserManagementService.reducer,
    [HotelManagementService.reducerPath]: HotelManagementService.reducer,
    [HotelServiceManagement.reducerPath]: HotelServiceManagement.reducer,
});

export default rootReducer;