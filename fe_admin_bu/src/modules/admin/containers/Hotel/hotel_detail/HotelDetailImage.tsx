import {
    HotelManagementInfoDetailProps
} from "@/modules/admin/containers/Hotel/hotel_detail/HotelManagementInfoDetail.tsx";
import {Button, Flex, Image, message, Table, TableColumnsType} from "antd";
import {Text} from "components/typhograpy/Text.tsx";
import CloudinaryUploadWidget from "components/ImageUpload.tsx";
import {useState} from "react";
import styled from "styled-components";
import {AnyObject} from "antd/lib/_util/type";
import {CheckOutlined, ExclamationOutlined, PlusOutlined, WarningOutlined} from "@ant-design/icons";
import {StyledTag} from "@/modules/admin/containers/Booking/BookingTable.tsx";
import {Modal} from "components/modal/Modal.tsx";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {
    closeLoadingMessage,
    openLoadingMessage
} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/ServiceModalDelete.tsx";

export const HotelDetailImage = ({hotelDetail}: HotelManagementInfoDetailProps) => {

    const [urlImage, setUrlImage] = useState("");
    const [cloudName] = useState("dsz00cxkk");
    const [uploadPreset] = useState("ujez4mee");
    const [uwConfig] = useState({
        cloudName,
        uploadPreset
    });
    const mainImage = hotelDetail?.images?.find((image: any) => image.isMain);
    const otherImages = hotelDetail?.images?.filter((image: any) => !image.isMain);

    console.log(hotelDetail?.images)
    const columns: TableColumnsType<AnyObject> = [
        {
            title: "Ảnh",
            key: "",
            align: "start",
            width: 50,
            render: (record: AnyObject) => <Image src={record.url}/>
        },
        {
            title: "Ảnh chính",
            dataIndex: "",
            align: "center",
            width: 100,
            render: (record: AnyObject) => record.isMain ?
                <CheckOutlined style={{color: "green"}}/> :
                <ExclamationOutlined style={{color: "orange"}}/>
        },
        {
            title: "Alt",
            dataIndex: "alt",
            align: "center",
            width: 200,
        },
        {
            title: "Tùy chỉnh",
            dataIndex: "",
            key: "option",
            width: 100,
            align: "center",
            render: (record) => <Flex gap={6} style={{
                justifyContent: "center",
            }}>

                <StyledHotelDetailImage uwConfig={uwConfig} setUrlImage={setUrlImage}/>


                <StyledButton size={"large"} danger >Xóa</StyledButton>

            </Flex>
        }
    ];
    return (
        <Flex vertical={true}>
            <ModalAddImage/>
            <Table
                columns={columns}
                dataSource={hotelDetail.images}
            />

        </Flex>


    )
}
export const StyledHotelDetailImage = styled(CloudinaryUploadWidget)`
    height: 20px;
    width: 20px;
`
const StyledButton = styled(Button)`
    height: 48px;
`
const ModalAddImage = () => {
    const addHotelPoliciesHandler = () => {

    }
    return (
        <Flex style={{
            marginBottom: "5px"
        }}>
            <Modal
                title={"Thêm Ảnh"}
                trigger={
                    <StyledResetButton style={{
                        marginLeft: "auto"
                    }}>
                        <Button
                            children={
                                <>
                                    {" "}
                                    <span>Thêm mới</span>
                                    <PlusOutlined/>
                                </>
                            }
                        />
                    </StyledResetButton>
                }
                width={"600px"}
                okText={"Thêm mới"}
                cancelText={"Hủy"}
                afterClose={addHotelPoliciesHandler}
            >
                abc
            </Modal>

        </Flex>
    )
}