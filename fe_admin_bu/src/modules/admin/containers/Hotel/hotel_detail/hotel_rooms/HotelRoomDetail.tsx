import {HotelDetailProps} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/HotelServiceDetail.tsx";
import {useGetAllRoomByHotelIdQuery, useGetAllRoomTypeQuery} from "@/modules/admin/services/HotelServiceManagement.ts";
import {useEffect, useState} from "react";
import {Table, TableColumnsType} from "antd";
import {AnyObject} from "antd/lib/_util/type";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {Currency} from "components/currency/Currency.tsx";

export const HotelRoomDetail = ({hotelId}: HotelDetailProps) => {
    const {data: hotelRooms, refetch} = useGetAllRoomByHotelIdQuery(hotelId);
    const {data: hotelRoomTypes} = useGetAllRoomTypeQuery({});

    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    console.log("Roooooommss", hotelRooms);
    useEffect(() => {

    }, [hotelRooms]);
    useEffect(() => {
        refetch();
        setIsDeleted(false);
        setIsAdded(false);
    }, [isAdded, isDeleted]);

    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const columns: TableColumnsType<AnyObject> = [
        {
            title: "Tên loại phòng",
            dataIndex: "",
            key: "",
            align: "start",
            width: 100,
            render: (record: AnyObject) => record.roomType.name
        },
        {
            title: "Số lượng phòng",
            dataIndex: "amount",
            key: "amount",
            align: "center",
            width: 50,
        },
        {
            title: "Diện tích",
            dataIndex: "",
            key: "",
            align: "center",
            width: 50,
            render: (record: AnyObject) => <span>{record.roomType.area} m<sup>2</sup> </span>

        },
        {
            title: "Người lớn",
            dataIndex: "",
            key: "",
            align: "center",
            width: 30,
            render: (record: AnyObject) => record.roomType.maxAdults
        },
        {
            title: "Người lớn",
            dataIndex: "",
            key: "",
            align: "center",
            width: 30,
            render: (record: AnyObject) => record.roomType.maxChildren
        },
        {
            title: "Giá",
            dataIndex: "",
            key: "",
            align: "center",
            width: 200,
            render: (record: AnyObject) => <Currency price={record.roomType.price}/>
        },
        // {
        //     title: "Trạng thái",
        //     dataIndex: "status",
        //     key: "status",
        //     align: "center",
        //     width: 80,
        //     render: (status: string) => {
        //         let statusColor = "#87d068";
        //         let statusIcon = <CheckOutlined/>;
        //         switch (status) {
        //             case "INACTIVE":
        //                 statusColor = "#2db7f5";
        //                 statusIcon = <ExclamationOutlined/>;
        //                 break;
        //             case "ACTIVE":
        //                 statusColor = "#87d068";
        //                 statusIcon = <CheckOutlined/>;
        //
        //                 break;
        //             case "DEACTIVATED":
        //                 statusColor = " #ff0000";
        //                 break;
        //             default:
        //                 statusColor = "#dc3545";
        //                 statusIcon = <WarningOutlined/>;
        //                 break;
        //         }
        //         return (
        //             <StyledTag color={statusColor}>
        //                 {statusIcon}
        //                 <Text fontSize={"13px"} fontWeight={600} color={"#fff"}>
        //                     {status}
        //                 </Text>
        //             </StyledTag>
        //
        //         );
        //     }
        // },
        // {
        //     title: "Tùy chỉnh",
        //     dataIndex: "",
        //     key: "option",
        //     width: 120,
        //     align: "center",
        //     render: (record) => <ServiceModalDelete setIsDeleted={handleDelete}  serviceId={record.id} hotelId={hotelId}/>
        // }
    ];
    const expandedRowRender = (record: AnyObject) => {
        return (
            <div style={{
                backgroundColor: "blueviolet",
            }}>
                Hello
            </div>
        )


    }
    return (
        <div>
            {/*<ServiceModal*/}
            {/*    handleAdd={handleAdd}*/}
            {/*    hotelService={hotelService}*/}
            {/*    hotelId={hotelId}*/}
            {/*/>*/}
            {
                hotelRooms &&
                <Table
                    columns={columns}
                    dataSource={hotelRooms}
                    pagination={{pageSize: 5}}
                    size={"small"}
                    // expandable={{
                    //     columnWidth: 10,
                    //     expandedRowRender: (record) => expandedRowRender(record),
                    //     rowExpandable: (record) => record.id === expandedRow,
                    //     onExpand: (expanded, record) => setExpandedRow(expanded ? record.id : null),
                    //     expandIcon: ({onExpand, record}) => (
                    //         record.id === expandedRow ? (
                    //             <MinusOutlined
                    //                 onClick={e => onExpand(record, e)}
                    //             />
                    //         ) : (
                    //             <PlusOutlined
                    //                 onClick={e => onExpand(record, e)}
                    //             />
                    //         )
                    //     ),
                    // }}
                />
            }

        </div>
    );
}