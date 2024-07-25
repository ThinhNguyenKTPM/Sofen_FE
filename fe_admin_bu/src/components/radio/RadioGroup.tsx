import {useState} from 'react';
import type {RadioChangeEvent} from 'antd';
import {Radio as AntdRadio, Space as AntdSpace, RadioProps as AntdRadioProps} from 'antd';
import styled from "styled-components";

export interface RadioProps extends AntdRadioProps {
    options: { label: string; value: number }[],
    handleOnChange?: (value: number) => void,
    selectedValue?: number,
    defaultValue?: number,
}

const RadioGroup = ({options, handleOnChange,defaultValue, ...props}: RadioProps) => {
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        if (handleOnChange) {
            handleOnChange(e.target.value)
        }
    };

    return (
        <AntdRadio.Group onChange={onChange} value={value} {...props} defaultValue={defaultValue}>
            <AntdSpace direction="vertical" >
                {options.map((option) => (
                    <StyledRadio key={option.value} value={option.value} >
              <span className={"custom-label"}>
                {option.label} 
              </span>
                    </StyledRadio>
                ))}
            </AntdSpace>
        </AntdRadio.Group>
    );
};

export default RadioGroup;

const StyledRadio = styled(AntdRadio)`
    color: #999999;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: 'KoHo';A
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;

    &:hover .ant-radio-inner {
        border-color: #FFBA0A;
    }

    &:hover .custom-label {
        font-weight: 700;
        color: #333333;
    }

    .ant-radio-inner {
        border-color: #CCCCCC;
        background-color: white;
        width: 16px;
        height: 16px;
    }

    .ant-radio-checked .ant-radio-inner {
        border-color: #FFBA0A;
        background-color: #FFBA0A;
    }

    .ant-radio-checked .ant-radio-inner::after {
        background-color: #FFBA0A;
        transform: none;
        transition: all 0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        width: 16px;
        height: 16px;
        margin-block-start: -8px;
        margin-inline-start: -8px;
    }

    .ant-radio-checked::after {
        border: none;
    }

    &.ant-radio-wrapper-checked .custom-label {
        font-weight: 700;
        color: #333333;
    }
`;