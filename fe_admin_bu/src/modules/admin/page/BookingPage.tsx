
import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {BookingManagement} from "@/modules/admin/containers/Booking/BookingManagement.tsx";
import {useParams} from "react-router-dom";

export const BookingPage = () => {
    const routeParams = useParams();
    console.log("routeeer",routeParams);
    return(
        <AdminPage
            className="booking-page"
            defaultSelectedValue={"Booking"}
        >
          <BookingManagement />
        </AdminPage>
    )
}