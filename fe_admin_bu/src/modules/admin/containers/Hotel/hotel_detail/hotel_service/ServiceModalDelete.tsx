import {Modal} from "components/modal/Modal.tsx";
import {Button, message} from "antd";
import {useRemoveHotelServiceMutation} from "@/modules/admin/services/HotelManagementService.ts";

export const openLoadingMessage = (mes: string) => {
    message.loading({
        content: {mes},
        key: "loadingKey",
        duration: 0,
    });
};
export const closeLoadingMessage = () => {
    message.destroy("loadingKey");
};

export interface ServiceModalDeleteProps {
    hotelId: string;
    serviceId: number;
    setIsDeleted: () => void;
}

export const ServiceModalDelete = ({setIsDeleted, hotelId, serviceId}: ServiceModalDeleteProps) => {
    const [removeHotelService] = useRemoveHotelServiceMutation();
    const handleDelete = () => {
        openLoadingMessage("Đang xóa dịch vụ");
        removeHotelService({hotelId, serviceId})
            .unwrap()
            .then(() => {
                closeLoadingMessage();
                message.success("Xóa dịch vụ thành công");
            }).catch(() => {
            message.error("Xóa dịch vụ thất bại", 0.5);
        });
        setIsDeleted();
    };
    return (
        <>
            <Modal
                title="Xác nhận xóa dịch vụ"
                okText="Xóa"
                cancelText="Hủy"
                trigger={<Button danger>Xóa</Button>}
                afterClose={handleDelete}
                width={"350px"}
            >
                <p>
                    Bạn có chắc chắn muốn xóa dịch vụ này?
                </p>
            </Modal>
        </>
    )
}