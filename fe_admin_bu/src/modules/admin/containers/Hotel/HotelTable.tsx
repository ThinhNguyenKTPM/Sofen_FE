import {HotelFilterReq} from "@/modules/admin/model/HotelManagement.ts";
import {useFilterQuery} from "@/modules/admin/services/HotelManagementService.ts";
import {Button, TableColumnsType, TableProps} from "antd";
import {AnyObject} from "antd/lib/_util/type";
import {StyledTable, StyledTag} from "@/modules/admin/containers/Booking/BookingTable.tsx";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {useState} from "react";
import {CheckOutlined, ExclamationOutlined, WarningOutlined} from "@ant-design/icons";
import {Text} from "components/typhograpy/Text.tsx";
import {useNavigate} from "react-router-dom";
import {AdminSiteMap} from "@/modules/admin/routers/AdminSiteMap.ts";

export interface HotelTableProps {
    paramsQuery: HotelFilterReq;
    handleHotelDetail: (record: AnyObject) => void;
    hotelTableOnChange: (params: HotelFilterReq) => void;
}

export const HotelTable = ({paramsQuery, hotelTableOnChange}: HotelTableProps) => {
    const navigate = useNavigate();
    const {data: res} = useFilterQuery(paramsQuery);
    const [currentPage, setCurrentPage] = useState(res?.pageable.pageNumber ?? 1   );

   

    const handleDetail = (record: AnyObject) => {
        navigate(AdminSiteMap.HOTEL_DETAIL_GEN(record.id));
    }
    const columns: TableColumnsType<AnyObject> = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            align: "start",

        },
        {
            title: "Địa chỉ",
            dataIndex: "",
            align: "center",
            render: (record: AnyObject) => {
                return (
                    record.addressDetail + ", " + record.hotelAddress.ward +
                    ", " + record.hotelAddress.district + ", " + record.hotelAddress.province + ", " + record.hotelAddress.nation
                )
            }
        },
        {
            title: "Mã ĐT",
            // key: "phoneNumberCode",
            align: "center",
            render: (record: AnyObject) => record.hotelContact?.phoneNumberCode
        },
        {
            title: "Điện thoại",
            align: "center",
            render: (record: AnyObject) => record.hotelContact?.phoneNumber
        },
        {
            title: "Email",
            align: "center",
            render: (record: AnyObject) => record.hotelContact?.email
        },
        // {
        //     title: "Trạng thái",
        //     dataIndex: "status",
        //     key: "status",
        //     align: "center",
        //     width: 90,
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
        {
            title: "Tùy chỉnh",
            dataIndex: "",
            key: "option",
            width: 170,
            align: "center",
            fixed: 'right',
            render: (_value, record) => {
                return (
                    <StyledResetButton style={{

                    }}>

                        <Button
                            style={{
                                width: "100px",
                                fontSize: "14px",
                                height: "30px",
                            }}
                            children={
                                <>
                                    {" "}
                                    <span>Xem chi tiết</span>
                                </>
                            }
                            onClick={() => handleDetail(record)}
                        />
                    </StyledResetButton>
                )

            },
        }
    ];

    const handleTableChange: TableProps["onChange"] = (pagination) => {
        setCurrentPage(pagination.current || 1);
        hotelTableOnChange({ ...paramsQuery, page: pagination.current });
    };
    return (
        <StyledTable
            columns={columns}
            dataSource={res?.content}
            rowKey={"id"}
            onChange={handleTableChange}
            pagination={{
                total: res?.totalElements,
                pageSize: res?.size,
                current: currentPage,
                showTotal: (total) => `Tổng số ${total} khách sạn`,
            }}
            size={"large"}
            style={{
                overflowX: "auto",
            }}
        >
        </StyledTable>
    )
}