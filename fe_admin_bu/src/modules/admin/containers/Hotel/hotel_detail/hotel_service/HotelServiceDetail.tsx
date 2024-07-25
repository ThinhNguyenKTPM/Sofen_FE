import {Table, TableColumnsType} from "antd";
import {AnyObject} from "antd/lib/_util/type";
import {CheckOutlined, ExclamationOutlined, WarningOutlined} from "@ant-design/icons";
import {StyledTag} from "@/modules/admin/containers/Booking/BookingTable.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {ServiceModal} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/ServiceModal.tsx";
import {useGetAllServiceByHotelIdQuery} from "@/modules/admin/services/HotelServiceManagement.ts";
import {ServiceModalDelete} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/ServiceModalDelete.tsx";
import {useEffect, useState} from "react";

export interface HotelDetailProps {
    hotelId: string;
}

export const HotelServiceDetail = ({hotelId}: HotelDetailProps) => {
    const {data: hotelService, refetch} = useGetAllServiceByHotelIdQuery(hotelId);
    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {

    }, [hotelService]);
    useEffect(() => {
        refetch();
        setIsDeleted(false);
        setIsAdded(false);
    }, [isAdded, isDeleted]);


    const handleDelete = () => {
        setIsDeleted(true);
    }
    const handleAdd = () => {
        setIsAdded(true);
    }
    const columns: TableColumnsType<AnyObject> = [
        {
            title: "Tên loại phòng",
            dataIndex: "name",
            key: "name",
            align: "start",
            width: 100,
        },
        {
            title: "Tên dịch vụ (EN)",
            dataIndex: "",
            key: "",
            align: "center",
            width: 100,
            render: (record: AnyObject) => record.hotelServiceDetails[1].name
        },
        {
            title: "Mô tả (EN)",
            dataIndex: "",
            key: "",
            align: "center",
            width: 300,
            render: (record: AnyObject) => record.hotelServiceDetails[1].description
        },
        ,
        {
            title: "Tên dịch vụ (VN)",
            dataIndex: "",
            key: "",
            align: "center",
            width: 100,
            render: (record: AnyObject) => record.hotelServiceDetails[0].name
        },
        {
            title: "Mô tả (VN)",
            dataIndex: "",
            key: "",
            align: "center",
            width: 300,
            render: (record: AnyObject) => record.hotelServiceDetails[0].description
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 80,
            render: (status: string) => {
                let statusColor = "#87d068";
                let statusIcon = <CheckOutlined/>;
                switch (status) {
                    case "INACTIVE":
                        statusColor = "#2db7f5";
                        statusIcon = <ExclamationOutlined/>;
                        break;
                    case "ACTIVE":
                        statusColor = "#87d068";
                        statusIcon = <CheckOutlined/>;

                        break;
                    case "DEACTIVATED":
                        statusColor = " #ff0000";
                        break;
                    default:
                        statusColor = "#dc3545";
                        statusIcon = <WarningOutlined/>;
                        break;
                }
                return (
                    <StyledTag color={statusColor}>
                        {statusIcon}
                        <Text fontSize={"13px"} fontWeight={600} color={"#fff"}>
                            {status}
                        </Text>
                    </StyledTag>

                );
            }
        },
        {
            title: "Tùy chỉnh",
            dataIndex: "",
            key: "option",
            width: 120,
            align: "center",
            render: (record) => <ServiceModalDelete setIsDeleted={handleDelete}  serviceId={record.id} hotelId={hotelId}/>
        }
    ];
    return (
        <div>
            <ServiceModal
                handleAdd={handleAdd}
                hotelService={hotelService}
                hotelId={hotelId}
            />
            {
                hotelService &&
                <Table
                    columns={columns}
                    dataSource={hotelService}
                    pagination={{pageSize: 5}}
                    size={"small"}
                />
            }

        </div>
    );
}