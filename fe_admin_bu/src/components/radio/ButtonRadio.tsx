import {useState} from 'react';
import type {RadioChangeEvent} from 'antd';
import {Radio as AntdRadio, Space as AntdSpace, RadioProps as AntdRadioProps} from 'antd';
import styled from "styled-components";

export interface RadioProps extends AntdRadioProps {
    options: { label: string; value: number }[],
    handleOnChange?: (value: string) => void
}

const ButtonRadio = ({options, handleOnChange, ...props}: RadioProps) => {
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        if(handleOnChange){
            handleOnChange(e.target.value);
        }
    };

    return (
        <AntdRadio.Group onChange={onChange} value={value} {...props}>
            <StyledRadio>
                <AntdSpace direction="vertical">
                    {options.map((option) => (
                        <AntdRadio.Button key={option.value} value={option.value}>
                            <div className={"custom-button"}>
                      <span className={"custom-label"}> 
                          {option.label} 
                      </span>
                            </div>
                        </AntdRadio.Button>
                    ))}
                </AntdSpace>
            </StyledRadio>
        </AntdRadio.Group>
    );
};

export default ButtonRadio;

const StyledRadio = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;

    .ant-radio-button-wrapper {
        height: 26px;
        border: none;
        background: var(--neutral-10-background, linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%), #333);
        display: flex;
        padding: 4px 16px;
        justify-content: center;
        align-items: center;
        gap: 4px;
    }

    .ant-radio-button-wrapper:hover {
        background: var(--Color-Branding-Yellow, linear-gradient(60deg, #F9A51A -4.93%, #FBB612 18.27%, #FD0 71.59%));

        .custom-label {
            color: #333;
            font-weight: 700;
        }
    }

    .ant-radio-button-wrapper:first-child:last-child {
        border-radius: 23px;
    }

    .ant-radio-button-wrapper:not(:first-child)::before {
        display: none;
    }

    .custom-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .custom-label {
        color: var(--neutral-80-bodyfont, #333);
        text-align: center;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: KoHo;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
    }

    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {

        background: var(--Color-Branding-Yellow, linear-gradient(60deg, #F9A51A -4.93%, #FBB612 18.27%, #FD0 71.59%));

        .custom-label {
            color: #333;
            font-weight: 700;
        }
    }

    .ant-space-item {
        display: flex;
    }
`;