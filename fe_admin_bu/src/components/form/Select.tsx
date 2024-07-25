/* eslint-disable react-refresh/only-export-components */
import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd"; // Import Antd Select
import { getIn, connect, useFormikContext } from "formik";
import { ReactNode, useMemo } from "react";
import styled from "styled-components";
import { AdminErrorMessage } from "./AdminErrorMessage";

const { Option } = AntdSelect; // Destructure Option from AntdSelect

export interface SelectProps extends AntdSelectProps {
    label?: ReactNode;
    name: string;
    value?: string | { value: { value: number; label: string } }[];
    isRequired?: boolean;
    handleOnChange?: (value: string) => void;
}

const Select = ({
    name,
    value,
    handleOnChange,
    options,
    ...props
}: SelectProps) => {
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

    return (
        <>
            <StyledSelect
                value={inputValue?.toString()}
                onChange={(value) => onChange(value.toString())}
                {...props}
            >
                {options &&
                    options.map((opt, index) => (
                        <Option key={index} value={opt.value}>
                            <>{opt.label}</>
                        </Option>
                    ))}
            </StyledSelect>
            <AdminErrorMessage name={name} />
        </>
    );
};

export default connect(Select);

const StyledSelect = styled(AntdSelect)<AntdSelectProps>`
    height: 48px;
    font-size: 18px;
    width: 100%;
    font-family: KoHo;
    font-weight: bold;
`;
