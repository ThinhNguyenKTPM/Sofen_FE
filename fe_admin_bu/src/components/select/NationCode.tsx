import React from 'react';
import {Select} from 'antd';
import nationCodes from "public/utils/NationCode.ts";
import styled from "styled-components";

const {Option,} = Select;


interface PhoneNationCodeProps {
    onSelect: (value: any, option: any) => void;
    defaultValue?: string;
}

const PhoneNationCode: React.FC<PhoneNationCodeProps> = ({defaultValue, onSelect}) => {
    return (
        <StyledPhoneNationCode
            value={defaultValue}
            showSearch
            style={{width: 200}}
            placeholder="Select nation code"
            optionFilterProp="children"
            onChange={onSelect}
            filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {nationCodes.map((nation) => (
                <Option key={nation.code} value={nation.code}>
                    {`${nation.country} (${nation.code})`}
                </Option>
            ))}
        </StyledPhoneNationCode>
    );
};

export default PhoneNationCode;

const StyledPhoneNationCode = styled(Select)`
    height: 45px;
    margin-top: 10px;
    &.ant-select-selector {
        border-radius: 12px !important;
    }
`
