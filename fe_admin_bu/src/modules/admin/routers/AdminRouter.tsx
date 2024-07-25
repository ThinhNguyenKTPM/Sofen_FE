import {RouteObject} from "react-router";
import {AdminSiteMap} from "@/modules/admin/routers/AdminSiteMap.ts";
import {Dashboard} from "@/modules/admin/page/Dashboard.tsx";
import {BookingPage} from "@/modules/admin/page/BookingPage.tsx";
import {HotelPage} from "@/modules/admin/page/HotelPage.tsx";
import {CustomersPage} from "@/modules/admin/page/CustomersPage.tsx";
import {EmployeesPage} from "@/modules/admin/page/EmployeesPage.tsx";
import {RoomPage} from "@/modules/admin/page/RoomPage.tsx";
import {ServicePage} from "@/modules/admin/page/ServicePage.tsx";
import {PoliciesPage} from "@/modules/admin/page/PoliciesPage.tsx";
import {LoginPage} from "authentication/pages/LoginPage.tsx";
import {FurnitureRoom} from "@/modules/admin/page/FurnitureRoom.tsx";


export const ADMIN_ROUTERS: RouteObject[] = [
  {path: AdminSiteMap.INDEX, element: <Dashboard/>},
  {path: AdminSiteMap.BOOKINGS_MANAGEMENT, element: <BookingPage/> },
  {path: AdminSiteMap.HOTELS_MANAGEMENT, element: <HotelPage/> },
  {path: AdminSiteMap.ROOM_MANAGEMENT, element: <RoomPage/> },
  {path: AdminSiteMap.SERVICES_MANAGEMENT, element: <ServicePage/> },
  {path: AdminSiteMap.POLICIES_MANAGEMENT, element: <PoliciesPage/>},
  {path: AdminSiteMap.CUSTOMERS_MANAGEMENT, element:<CustomersPage/>},
  {path: AdminSiteMap.EMPLOYEES_MANAGEMENT, element:<EmployeesPage/> },
  {path: AdminSiteMap.HOTEL_DETAIL, element: <HotelPage/>},
  {path: AdminSiteMap.NOT_FOUND, element: <LoginPage />},
  {path: AdminSiteMap.FURNITURE_ROOM, element: <FurnitureRoom/>}
];
