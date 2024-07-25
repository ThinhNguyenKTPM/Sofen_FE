import {HotelDetailProps} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/HotelServiceDetail.tsx";
import {useGetAllPolicyByHotelIdQuery} from "@/modules/admin/services/HotelServiceManagement.ts";
import {useEffect, useState} from "react";
import {Table, TableColumnsType} from "antd";
import {AnyObject} from "antd/lib/_util/type";
import {CheckOutlined, ExclamationOutlined, WarningOutlined} from "@ant-design/icons";
import {StyledTag} from "@/modules/admin/containers/Booking/BookingTable.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {ServiceModalDelete} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/ServiceModalDelete.tsx";
import {PoliciesModal} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_policies/PoliciesModal.tsx";

export const HotelPoliciesDetail = ({hotelId}: HotelDetailProps) => {
    const {data: hotelPolicies, refetch} = useGetAllPolicyByHotelIdQuery(hotelId);
    console.log(hotelPolicies);

    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {

    }, [hotelPolicies]);
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
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
            align: "start",
            width: 100,
        },
        {
            title: "Tên dịch vụ (EN)",
            dataIndex: "",
            align: "center",
            width: 100,
            render: (record: AnyObject) => record.policyDetails[0].name
        },
        {
            title: "Mô tả (EN)",
            align: "center",
            width: 300,
            render: (record: AnyObject) => record.policyDetails[0].description
        },
        ,
        {
            title: "Tên dịch vụ (VN)",
            dataIndex: "",
            align: "center",
            width: 100,
            render: (record: AnyObject) => record.policyDetails[1].name
        },
        {
            title: "Mô tả (VN)",
            align: "center",
            width: 300,
            render: (record: AnyObject) => record.policyDetails[1].description
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
                        <Text fontSize={"12px"} fontWeight={600} color={"#fff"}>
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
            width: 100,
            align: "center",
            render: (record) => <ServiceModalDelete setIsDeleted={handleDelete}  serviceId={record.id} hotelId={hotelId}/>
        }
    ];
    return (
        <div>
            <PoliciesModal handleAdd={handleAdd} hotelId={hotelId} policies={hotelPolicies}/>
            {
                hotelPolicies &&
                <Table
                    columns={columns}
                    dataSource={hotelPolicies}
                    pagination={{pageSize: 5}}
                    size={"small"}
                />
            }
        </div>
    );
}