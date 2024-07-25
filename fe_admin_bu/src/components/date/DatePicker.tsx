import {DatePicker as AntdDatePicker} from 'antd';

import {RangePickerProps} from "antd/es/date-picker";
import styled from "styled-components";
import dayjs from "dayjs";

interface DateProps extends RangePickerProps {
    onChangeCheckInDate: (date: dayjs, value: string) => void;
    name: string;
    disabledDate?: RangePickerProps['disabledDate'];
}
export const DatePicker = ({onChangeCheckInDate, name, disabledDate, ...drop} : DateProps) => {
    return (
        <StyledDatePicker
            onChange={onChangeCheckInDate}
            name={name}
            disabledDate={disabledDate}
            {...drop}
            cellHeight={48}
        />

    )
};

const StyledDatePicker = styled(AntdDatePicker)`
    height: 38px;
    font-size: 18px;
    width: 100%;
    font-family: KoHo;
    font-weight: bold;
`;