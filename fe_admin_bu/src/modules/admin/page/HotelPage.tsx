import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {HotelManagement} from "@/modules/admin/containers/Hotel/HotelManagement.tsx";
import {useParams} from "react-router-dom";
import {HotelDetail} from "@/modules/admin/containers/Hotel/HotelDetail.tsx";

export const HotelPage = () => {
    const routeParams = useParams();
    const render = (): React.ReactNode => {
        if(routeParams.id) {
            return <HotelDetail hotelId={routeParams.id}/>
        }
        return <HotelManagement/>
    }
    return (
        <AdminPage
            className="order-page"
            defaultSelectedValue={"Hotel"}
        >
            {render()}

        </AdminPage>
    )
}