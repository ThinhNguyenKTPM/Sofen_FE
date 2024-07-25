import { InputGroup } from "components/form/InputGroup.tsx";
import { DatePicker, DatePickerProps } from "antd";

import { ReactNode, useMemo, useState } from "react";
import styled from "styled-components";
import { getIn, useFormikContext } from "formik";
import { ErrorMessage } from "components/form/ErrorMessage.tsx";

export interface DateInputProps extends DatePickerProps {
  label?: ReactNode;
  name: string;
  isRequired?: boolean;
  value?: Date;
  format: string;
  isShowTime?: boolean;
  handleOnChange?: (value: Date) => void;
  placeholder?: string;

}

export const DateInput = ({
  label,
  name,
  value,
  isRequired,
  format,
  isShowTime,
  handleOnChange,
  placeholder,
  ...props
}: DateInputProps) => {
  const [isLabelVisible, setLabelVisible] = useState(true);
  const formik = useFormikContext();
  const inputValue = useMemo(() => {
    return value !== undefined ? value : getIn(formik.values, name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, getIn(formik.values, name)]);
  const onChange = (value: DatePickerProps["value"]) => {
    if (value === null) {
      setLabelVisible(true);
    } else if (value !== undefined && value.toString().length > 0) {
      setLabelVisible(false);
      // console.log(value.format("DD/MM/YYYY"));
    }
    if (handleOnChange) {
      handleOnChange(value);
    } else {
      formik.setFieldValue(name, value);
    }
  };
  return (
    <InputGroup
      isDisplay={isLabelVisible}
      label={label}
      isRequired={isRequired}
    >
      <StyledDateInput
        placeholder={placeholder? placeholder: ""}
        value={inputValue}
        onChange={onChange}
        format={format}
        showTime={isShowTime}
        size={"large"}
        {...props}
      />
      <ErrorMessage name={name} />
    </InputGroup>
  );
};

const StyledDateInput = styled(DatePicker)`
  background-color: transparent !important;
  box-shadow: none !important;
  border: none;
  height: 40px;
  margin-top: 7px;
  margin-bottom: 7px;
  padding-left: 15px;
  font-size: 18px;
  font-weight: bold;
   {
    input {
      font-family: KoHo !important;
    }
  }
`;
