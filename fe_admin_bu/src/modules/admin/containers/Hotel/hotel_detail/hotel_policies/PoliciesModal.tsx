import {Flex, message, Select} from "antd";
import {Modal} from "components/modal/Modal.tsx";
import {Button} from "components/button/Button.tsx";
import {PlusOutlined} from "@ant-design/icons";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {
    closeLoadingMessage,
    openLoadingMessage
} from "@/modules/admin/containers/Hotel/hotel_detail/hotel_service/ServiceModalDelete.tsx";
import {useAddHotelPolicyMutation} from "@/modules/admin/services/HotelManagementService.ts";
import {useGetAllPolicyQuery} from "@/modules/admin/services/HotelServiceManagement.ts";
import {useState} from "react";
import styled from "styled-components";
export const PoliciesModal = ({handleAdd, hotelId, policies }) => {
    const [addHotelPolicies] = useAddHotelPolicyMutation();
    const idsInList1 = new Set(policies?.map((item: any) => item.id));

    const {data: res, refetch} = useGetAllPolicyQuery({});
    const unusedPolicies = res?.filter((item: any) => !idsInList1.has(item.id));

    const [selectedPolicy, setSelectedPolicy] = useState<number>(-1);

    const onSelect = (value: any, option: any) => {
        setSelectedPolicy(value);
    };
    const addHotelPoliciesHandler = () => {
        if (selectedPolicy === -1) {
            return;
        }
        openLoadingMessage("Đang thêm dịch vụ")
        addHotelPolicies({
            hotelId: hotelId,
            policyId: selectedPolicy
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
                afterClose={addHotelPoliciesHandler}
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
                    {unusedPolicies?.map((service) => (
                        <Option key={service.id} value={service.id}>
                            {service.name}
                        </Option>
                    ))}
                </StyledServiceSelect>
            </Modal>

        </Flex>
    )
}

const StyledServiceSelect = styled(Select)`
    height: 45px;
    margin: 20px 0;

    &.ant-select-selector {
        border-radius: 12px !important;
    }
`