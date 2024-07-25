import {Flex, message, Select} from "antd";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {Button} from "components/button/Button.tsx";
import {PlusOutlined} from "@ant-design/icons";
import {Modal} from "components/modal/Modal.tsx";
import {useGetAllServiceQuery} from "@/modules/admin/services/HotelServiceManagement.ts";
import styled from "styled-components";
import {useState} from "react";
import {useAddHotelServiceMutation} from "@/modules/admin/services/HotelManagementService.ts";
import {
    closeLoadingMessage,
    openLoadingMessage
} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/ServiceModalDelete.tsx";


export const ServiceModal = ({handleAdd, hotelId, hotelService}) => {
    const [addHotelService] = useAddHotelServiceMutation();
    const idsInList1 = new Set(hotelService?.map(item => item.id));

    const {data: res, refetch} = useGetAllServiceQuery({});
    const unusedServices = res?.filter(item => !idsInList1.has(item.id));
    const [selectedService, setSelectedService] = useState<number>(-1);
    const onSelect = (value: any, option: any) => {
        setSelectedService(value);
    };
    const addHotelServiceHandler = () => {
        if (selectedService === -1) {
            return;
        }
        openLoadingMessage("Đang thêm dịch vụ")
        addHotelService({
            hotelId: hotelId,
            serviceId: selectedService
        }).unwrap().then((res) => {
            closeLoadingMessage()
            message.success({content: "Thêm dịch vụ thành công", key: "addService"});
            refetch();
            handleAdd();
        }).catch((e) => {
            console.log(e)
        });
    }
    return (
        <Flex style={{
            marginBottom: "5px"
        }}>
            <Modal
                title={"Thêm mới dịch vụ"}
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
                width={"350px"}
                okText={"Thêm mới"}
                cancelText={"Hủy"}
                afterClose={addHotelServiceHandler}
            >

                <StyledServiceSelect
                    showSearch
                    style={{width: 300}}
                    placeholder="Chọn dịch vụ cần thêm"
                    optionFilterProp="children"
                    onChange={onSelect}
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {unusedServices?.map((service) => (
                        <Option key={service.id} value={service.id}>
                           {service.name}
                        </Option>
                    ))}
                </StyledServiceSelect>
            </Modal>

        </Flex>
    );
}
const StyledServiceSelect = styled(Select)`
    height: 45px;
    margin: 20px 0;

    &.ant-select-selector {
        border-radius: 12px !important;
    }
`