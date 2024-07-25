/* eslint-disable react-refresh/only-export-components */
import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import { getIn, connect, useFormikContext } from "formik";
import { ReactNode, useMemo, useState } from "react";
import styled from "styled-components";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { AdminErrorMessage } from "./AdminErrorMessage";
import { TextAreaProps } from "antd/es/input";

export interface InputProps extends AntdInputProps {
    label?: ReactNode;
    name: string;
    value?: string;
    handleOnChange?: (value: string) => void;
    textAreaProps?: TextAreaProps;
}

const AdminInput = ({
    name,
    value,
    type,
    placeholder,
    handleOnChange,
    textAreaProps,
    ...props
}: InputProps) => {
    const [isShowPassword, setShowPassword] = useState(
        () => type === "password"
    );
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
    };
    const handleToggleInputPassword = () => {
        setShowPassword((isShowPassword) => !isShowPassword);
        if (isShowPassword) setInputType("text");
        else setInputType("password");
    };
    const handleOnChangeInput = (e: any) => {
        onChange(e.target.value);
        if (e.target.value.length > 0) setLabelVisible(false);
        else setLabelVisible(true);
    };

    return (
        <>
            {type === "textarea" ? (
                <AntdInput.TextArea
                    value={inputValue.toString()}
                    onChange={handleOnChangeInput}
                    rows={8}
                    {...textAreaProps} // Add this line
                />
            ) : (
                <StyledAdminInput
                    type={inputType}
                    value={inputValue.toString()}
                    onChange={handleOnChangeInput}
                    {...props}
                    placeholder={placeholder}
                ></StyledAdminInput>
            )}
            {type === "password" && (
                <div
                    className="toggle-type-password"
                    onClick={handleToggleInputPassword}
                >
                    {!isShowPassword && <EyeOutlined />}
                    {isShowPassword && <EyeInvisibleOutlined />}
                </div>
            )}
            <AdminErrorMessage name={name} />
        </>
    );
};

const StyledAdminInput = styled(AntdInput)`
    height: 40px;
`;

export default connect(AdminInput);
