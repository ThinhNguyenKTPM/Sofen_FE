/* eslint-disable react-refresh/only-export-components */
import {Input as AntdInput, InputProps as AntdInputProps} from "antd";
import {getIn, connect, useFormikContext} from "formik";
import {ChangeEvent, ReactNode, useMemo, useState} from "react";
import styled from "styled-components";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import {BaseErrorMessage} from "./BaseErrorMessage.tsx";
import {TextAreaProps} from "antd/es/input";

export interface InputProps extends AntdInputProps {
    label?: ReactNode;
    name: string;
    value?: string;
    handleOnChange?: (value: string) => void;
    textAreaProps?: TextAreaProps;
    textAreaRows?: number;
}

const BaseInput = ({
                       name,
                       value,
                       type,
                       placeholder,
                       handleOnChange,
                       textAreaProps,
                       textAreaRows,
                       ...props
                   }: InputProps) => {
    const [isShowPassword, setShowPassword] = useState(
        () => type === "password"
    );
    const [isLabelVisible, setLabelVisible] = useState(false);
    const [inputType, setInputType] = useState(type);
    const formik = useFormikContext();
    const inputValue = useMemo(() => {
        return value !== undefined ? value : getIn(formik.values, name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, getIn(formik.values, name)]);

    const onChange = (value: string) => {
        if (handleOnChange) {
            handleOnChange(value);
        } else {
            formik.setFieldValue(name, value);
            formik.validateField(name).catch((e) => {
                console.log(e);
            });
        }
    };
    const handleToggleInputPassword = () => {
        setShowPassword((isShowPassword) => !isShowPassword);
        if (isShowPassword) setInputType("text");
        else setInputType("password");
    };
    const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
        if (e.target.value.length > 0) setLabelVisible(false);
        else setLabelVisible(true);
    };

    return (
        <>
            {type === "textarea" ? (
                <AntdInput.TextArea
                    value={inputValue}
                    onChange={handleOnChangeInput}
                    rows={textAreaRows}
                    {...textAreaProps} // Add this line
                />
            ) : (
                <>
                    <StyledAdminInput
                        type={inputType}
                        value={inputValue}
                        onChange={handleOnChangeInput}
                        {...props}
                        placeholder={placeholder}
                    >

                    </StyledAdminInput>
                    {type === "password" && (
                        <div
                            className="toggle-type-password"
                            onClick={handleToggleInputPassword}
                        >
                            {!isShowPassword && <EyeOutlined/>}
                            {isShowPassword && <EyeInvisibleOutlined/>}
                        </div>
                    )}
                </>


            )}

            <BaseErrorMessage name={name}/>
        </>
    );
};

const StyledAdminInput = styled(AntdInput)`
    height: 45px;
    border-radius: 12px;
    
    &.ant-input{
        font-size: 17px;
    }
    &.ant-input-outlined.ant-input-disabled, &.ant-input-outlined[disabled] {
        color: black !important;
        background-color: rgba(0, 0, 0, 0.04);
        border-color: #d9d9d9;
        box-shadow: none;
        cursor: not-allowed;
        opacity: 1;
    }
    .toggle-type-password{
        background-color: #FF6B00;
    }
`;

export default connect(BaseInput);
