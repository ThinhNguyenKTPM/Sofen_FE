import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {FurnitureFilter} from "@/modules/admin/containers/Furniture/FurnitureFilter.tsx";
import {FurnitureTable} from "@/modules/admin/containers/Furniture/FurnitureTable.tsx";

export const FurnitureRoom = () => {
    return (
        <AdminPage
            className="furniture-room-page"
            defaultSelectedValue={"Nội thất phòng"}
        >
           <FurnitureFilter />
            <FurnitureTable />

        </AdminPage>
    );
}