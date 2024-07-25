import {BookingHistoryReq, RoomBookingInfo} from "authentication/models/BookingHistory.ts";
import {useGetBookingHistoryQuery} from "@/modules/admin/services/BookingManagementService.ts";
import {Flex, Table, TableColumnsType, TableProps, Tag} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    ExclamationOutlined,
    MinusOutlined,
    PlusOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {Text} from "components/typhograpy/Text.tsx";
import styled from "styled-components";
import {Currency} from "components/currency/Currency.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {useState} from "react";
import {AnyObject} from "antd/lib/_util/type";

export interface BookingTableDrops {
    paramsQuery: BookingHistoryReq;
    accountTableOnChange: (params: BookingHistoryReq) => void;
}

export const BookingTable = ({paramsQuery, accountTableOnChange}: BookingTableDrops) => {
    const {data: bookingData} = useGetBookingHistoryQuery(paramsQuery);
    const [currentPage, setCurrentPage] = useState(bookingData?.pageable.pageNumber ?? 1   );
    console.log("bookingData", bookingData);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const columns: TableColumnsType<AnyObject> = [
        {
            title: "Mã đặt phòng",
            dataIndex: "bookingId",
            key: "bookingId",
            align: "center",
            width: 200,
        },
        {
            title: "Tên khách sạn",
            dataIndex: "hotelName",
            key: "hotelName",
            align: "start",
            width: 300,
        },

        {
            title: "Tổng tiền",
            dataIndex: "totalPrices",
            key: "totalPrices",
            align: "center",
            width: 200,
            render: (price: number) => {
                return (
                    <Text fontSize={"16px"} fontWeight={600}>
                        <Currency price={price}/>
                    </Text>
                );
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 100,
            align: "center",
            render: (status: string) => {
                let statusColor = "#87d068";
                let statusIcon = <CheckOutlined/>;
                switch (status) {
                    case "PENDING":
                        statusColor = "#2db7f5";
                        statusIcon = <ExclamationOutlined/>;
                        break;
                    case "SUCCESS":
                        statusColor = "#87d068";
                        statusIcon = <CheckOutlined/>;
                        break;
                    case "CANCEL":
                        statusColor = " #ff0000";
                        statusIcon = <CloseOutlined/>;
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
            },
        },
        {
            title: "Ngày đặt",
            dataIndex: "bookingDate",
            key: "bookingDate",
            align: "center",
            width: 150,
        },
        {
            title: "Check in",
            dataIndex: "checkIn",
            key: "checkIn",
            align: "center",
            width: 100,
        },
        {
            title: "Check out",
            dataIndex: "checkOut",
            key: "checkOut",
            align: "center",
            width: 200,
        },
        {
            title: "Yêu cầu đặc biết",
            dataIndex: "specialRequest",
            key: "specialRequest",
            align: "center",
            width: 200,
        },
        {
            title: "Điểm đón",
            dataIndex: "pickUpLocation",
            key: "pickUpLocation",
            align: "center",
            width: 200,
        },
        {
            title: "Họ và tên:",
            dataIndex: "fullName",
            key: "fullName",
            align: "center",
            width: 200,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
            width: 200,
        },
        {
            title: "Mã ĐT",
            dataIndex: "phoneCode",
            key: "phoneCode",
            align: "center",
            width: 100,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            align: "center",
            width: 200,
        },


    ];
    const expandedRowRender = (record : AnyObject) => {
        return <StyledExpand>
            {record.roomBookingInfos.map((room: RoomBookingInfo) => {
                return (
                    <>
                        <StyledRoomCard>
                            <Flex vertical={true}>
                                <Text fontSize={"16px"} fontWeight={600}>
                                    Tên phòng:
                                </Text>
                                <Text fontSize={"16px"} fontWeight={600}>
                                    Giá:
                                </Text>
                                <Text fontSize={"16px"} fontWeight={600}>
                                    Số lượng phòng:
                                </Text>
                                <Text fontSize={"16px"} fontWeight={600}>
                                    Tổng:
                                </Text>
                            </Flex>
                            <Flex vertical={true}>
                                <Text fontSize={"16px"} fontWeight={600} color={appConfig.colors.primary}>
                                    {room.name}
                                </Text>
                                <Text fontSize={"16px"} fontWeight={600} color={appConfig.colors.primary}>
                                    <Currency price={room.price}/> /phòng/ đêm
                                </Text>
                                <Text fontSize={"16px"} fontWeight={600} color={appConfig.colors.primary}>
                                    {room.amount}
                                </Text>
                                <Text fontSize={"16px"} fontWeight={600} color={appConfig.colors.primary}>
                                    <Currency price={room.price * room.amount} />
                                </Text>
                            </Flex>
                        </StyledRoomCard>
                    </>

                );
            })}
        </StyledExpand>
    }
    const handleTableChange: TableProps["onChange"] = (pagination) => {
        setCurrentPage(pagination.current || 1);
        accountTableOnChange({ ...paramsQuery, page: pagination.current  });
    };
    return (
            <StyledTable columns={columns}
                         dataSource={bookingData?.content}
                         expandable={{
                             expandedRowRender: (record) => expandedRowRender(record),
                             rowExpandable: (record) => record.bookingId === expandedRow,
                             onExpand: (expanded, record) => setExpandedRow(expanded ? record.bookingId : null),
                             expandIcon: ({ onExpand, record }) => (
                                 record.bookingId === expandedRow ? (
                                     <MinusOutlined
                                         onClick={e => onExpand(record, e)}
                                     />
                                 ) : (
                                     <PlusOutlined
                                         onClick={e => onExpand(record, e)}
                                     />
                                 )
                             ),
                         }}
                         onChange={handleTableChange}
                         pagination={{
                             current: currentPage,
                             pageSize: bookingData?.size,
                             total: bookingData?.totalElements,
                             showTotal: (total, range) =>
                                 `${range[0]}-${range[1]} / ${total} đặt phòng`,
                         }}
                         size={"large"}

            />
    );
}
export const StyledTable = styled(Table)`
    overflow: auto;
    &.ant-table-wrapper .ant-table {
        width: max-content;
        margin-left: auto;
        margin-right: auto;
    }

    &.ant-table-row .ant-table-row-level-0 {
        cursor: pointer;
    }
`
export const StyledTag = styled(Tag)`
    margin: auto;
    height: 30px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 10px 20px;
`;
const StyledExpand = styled(Flex)`
    gap: 6px;
    flex-wrap: wrap;
`;

const StyledRoomCard = styled(Flex)`
    gap: 6px;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(70, 52, 255, 0.5);
    padding: 10px 30px;
    margin-bottom: 12px;
`;