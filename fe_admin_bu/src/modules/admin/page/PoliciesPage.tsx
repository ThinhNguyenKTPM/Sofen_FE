import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {HotelPolicy} from "@/modules/admin/containers/Policy/HotelPolicy.tsx";

export const PoliciesPage = () => {
    return (
        <AdminPage
            className="policies-page"
            defaultSelectedValue={"Chính sách"}
        >

            <HotelPolicy></HotelPolicy>
        </AdminPage>
    )
}