/* eslint-disable react-refresh/only-export-components */
import { InputGroup } from "components/form/InputGroup.tsx";
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
import { getIn, connect, useFormikContext } from "formik";
import { ReactNode, useMemo, useState } from "react";
import { ErrorMessage } from "components/form/ErrorMessage.tsx";
import styled from "styled-components";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export interface InputProps extends AntdInputProps {
    label?: ReactNode,
    name: string,
    value?: string,
    isRequired?: boolean,
    handleOnChange?: (value: string) => void;
}

const Input = ({ label, name, value, type, isRequired, placeholder, handleOnChange, ...props }: InputProps) => {
    const [isShowPassword, setShowPassword] = useState(() => type === "password");
    const [isLabelVisible, setLabelVisible] = useState(true);
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
        }
    }
    const handleToggleInputPassword = () => {
        setShowPassword((isShowPassword) => !isShowPassword);
        if (isShowPassword)
            setInputType('text')
        else setInputType("password");

    }
    const handleOnChangeInput = (e: any) => {
        onChange(e.target.value)
        if (e.target.value.length > 0) setLabelVisible(false)
        else setLabelVisible(true)
    }

    return (
            <InputGroup label={label} isRequired={isRequired} isDisplay={isLabelVisible}>
                <StyledInput type={inputType} value={inputValue.toString()} onChange={handleOnChangeInput} {...props} placeholder={placeholder}>
                </StyledInput>
                {type === "password" &&
                    < div className="toggle-type-password" onClick={handleToggleInputPassword}>
                        {!isShowPassword && <EyeOutlined />}
                        {isShowPassword && <EyeInvisibleOutlined />}
                    </div>
                }
                <ErrorMessage name={name} />
            </InputGroup >
    )
}

export default connect(Input);

const StyledInput = styled(AntdInput)`
    background-color: transparent !important;
    box-shadow: none !important;
    border: none;
    height: 40px;
    margin-top: 7px;
    margin-bottom: 7px;
    padding-left: 15px;
    font-size: 18px;
    font-family: KoHo;
    font-weight: bold;
    border-radius: 12px;
    input::placeholder{
        font-weight: normal;
    }
`

