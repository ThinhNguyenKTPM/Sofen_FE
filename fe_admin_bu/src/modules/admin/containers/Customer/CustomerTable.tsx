import {ManageAccountPaginationReq} from "@/modules/admin/model/UserManagement.ts";
import {useGetAccountManagementQuery} from "@/modules/admin/services/UserManagementService.ts";
import {Select, Table, TableColumnsType, TableProps} from "antd";
import {AnyObject} from "antd/lib/_util/type";
import {useEffect, useState} from "react";
import {StyledTag} from "@/modules/admin/containers/Booking/BookingTable.tsx";
import {editStatus} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import styled from "styled-components";

export interface AccountTableProps {
    paramsQuery: ManageAccountPaginationReq;
    accountTableOnChange: (params: ManageAccountPaginationReq) => void;
}

export const CustomerTable = ({paramsQuery, accountTableOnChange}: AccountTableProps) => {
    const {data: res} = useGetAccountManagementQuery(paramsQuery);
    console.log(res);
    useEffect(() => {

    }, [res]);
    const [currentPage, setCurrentPage] = useState( res?.pageable.pageNumber ?? 1 );
    const handleChangeStatus = (status: unknown, record: AnyObject) => {
        console.log(status);
    }
    const columns: TableColumnsType<AnyObject> = [
        {
            title: "Họ và tên",
            dataIndex: "fullName",
            key: "fullName",
            align: "center",
            width: 500,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
            width: 300,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            align: "center",
            width: 200,
        },
        {
            title: <> Ngày sinh </>,
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            align: "center",
            width: 250,
            render: (text) => {
                const date = new Date(text);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            align: "center",
            width: 500,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 200,
            align: "center",
            render: (status: string, record) => {
                return (
                    <>
                        {status === "INACTIVE" ? (
                            <StyledTag color="red">INACTIVE</StyledTag>
                        ) : (
                            status === "ACTIVE" ? (
                                <StyledTag color="green">ACTIVE</StyledTag>
                            ) : (
                                status === "DEACTIVATED" && (
                                    <StyledTag color="red">DEACTIVATED</StyledTag>
                                )
                            )
                        )}
                    </>
                );
            },
        },
    ];
    const handleTableChange: TableProps["onChange"] = (pagination) => {
        setCurrentPage(pagination.current || 1);
        accountTableOnChange({ ...paramsQuery, page: pagination.current  });
    };
    return (
        <div>
            <Table
                columns={columns}
                dataSource={res?.content}
                onChange={handleTableChange}
                pagination={{
                    current: currentPage,
                    pageSize: res?.size,
                    total: res?.totalElements,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} / ${total} tài khoản`,
                }}
                rowKey={(record) => record.id}
                size="small"
            />
        </div>
    );
}
const StyledSelect = styled(Select)`
    width: 120px;
`