import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {RoomType} from "@/modules/admin/containers/Room/RoomType.tsx";

export const RoomPage = () => {
    return (
        <AdminPage
            className="room-page"
            defaultSelectedValue={"Phòng"}
        >
            <RoomType></RoomType>
        </AdminPage>
    )
}