import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {Service} from "@/modules/admin/containers/Service/Service.tsx";

export const ServicePage = () => {
    return (
        <AdminPage
            className="service-page"
            defaultSelectedValue={"Dịch vụ"}
        >
             <Service/>
        </AdminPage>
    )
}