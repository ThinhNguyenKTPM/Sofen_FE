import {StyledManagementFilter} from "@/modules/admin/containers/Booking/BookingFilter.tsx";
import {Button, Flex, Select} from "antd";
import {Text} from "components/typhograpy/Text.tsx";
import {useState} from "react";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {ReloadOutlined} from "@ant-design/icons";

export interface HotelFilterProps {
    onReset: () => void;
    onChangeStatus: (value: string) => void;

}

export const HotelFilter = ({onReset, onChangeStatus}: HotelFilterProps) => {
    const [defaultStatus, setDefaultStatus] = useState("ALL");
    const optionsStatus = [
        {label: 'All', value: 'ALL'},
        {label: 'ACTIVE', value: 'ACTIVE'},
        {label: 'INACTIVE', value: 'INACTIVE'},
        {label: 'DEACTIVATED', value: 'DEACTIVATED'},
        {label: 'DELETED', value: 'DELETED'}
    ];

    const onChangeStatus1 = (value: string) => {
        onChangeStatus && onChangeStatus(value);
        setDefaultStatus(value);
    }
    const handleReset = () => {
        onReset && onReset();
        setDefaultStatus("ALL");
    }
    return (
        <StyledManagementFilter>
            {/*<Flex gap={6} align={"center"}>*/}
            {/*    <Text fontSize={"16px"} fontWeight={500}>*/}
            {/*        Trạng thái*/}
            {/*    </Text>*/}
            {/*    {*/}
            {/*        <Select*/}
            {/*            options={optionsStatus}*/}
            {/*            value={defaultStatus}*/}
            {/*            size={"large"}*/}
            {/*            onChange={onChangeStatus1}*/}
            {/*            style={{width: 200}}*/}
            {/*        />*/}
            {/*    }*/}
            {/*</Flex>*/}
            {/*<StyledResetButton style ={{*/}
            {/*    marginLeft: "auto"*/}
            {/*}}>*/}

            {/*    <Button*/}
            {/*        children={*/}
            {/*            <>*/}
            {/*                {" "}*/}
            {/*                <span>Làm mới</span>*/}
            {/*                <ReloadOutlined/>*/}
            {/*            </>*/}
            {/*        }*/}
            {/*        onClick={handleReset}*/}
            {/*    />*/}
            {/*</StyledResetButton>*/}
        </StyledManagementFilter>
    )
}