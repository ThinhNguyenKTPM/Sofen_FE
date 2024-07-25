import {useGetAllFurnitureRoomQuery} from "@/modules/admin/services/HotelServiceManagement.ts";
import {Button, Flex, Table, TableColumnsType} from "antd";
import {AnyObject} from "antd/lib/_util/type";
import {useEffect, useState} from "react";

export const FurnitureTable = () => {
    const {data: furnitureData, refetch} = useGetAllFurnitureRoomQuery({});
    console.log(furnitureData);

    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {

    }, [furnitureData]);
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
            title: "Tên nội thất",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: 200,
        },
        {
            title: "Tên dịch vụ (EN)",
            dataIndex: "",
            align: "center",
            width: 200,
            render: (record: AnyObject) => record.furnitureDetails[1].name
        },
        {
            title: "Mô tả (EN)",
            align: "center",
            width: 300,
            render: (record: AnyObject) => record.furnitureDetails[1].description
        },
        ,
        {
            title: "Tên dịch vụ (VN)",
            dataIndex: "",
            align: "center",
            width: 200,
            render: (record: AnyObject) => record.furnitureDetails[0].name
        },
        {
            title: "Mô tả (VN)",
            align: "center",
            width: 300,
            render: (record: AnyObject) => record.furnitureDetails[0].description
        },
        {
            title: "Thao tác",
            dataIndex: "",
            key: "option",
            width: 300,
            align: "center",
            render: (record) => <Flex gap={6} style={{
                justifyContent: "center",
            }}>

                <Button size={"large"} color={" #5270d0"} >Sửa</Button>

                <Button size={"large"} danger>Xóa</Button>

            </Flex>
        }
    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={furnitureData}
                pagination={{pageSize: 5}}
                size={"large"}
            />
        </>
    )

}