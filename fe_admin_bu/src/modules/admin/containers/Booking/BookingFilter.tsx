
import {useGetListHotelNameQuery} from "public/services/HotelServiceApi.ts";
import {Text} from "components/typhograpy/Text.tsx";
import {Button, DatePicker, Flex, Select} from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import {ReloadOutlined} from "@ant-design/icons";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {useState} from "react";

const {RangePicker} = DatePicker;

export interface BookingFilterProps {
    onReset: () => void;
    onChangeHotelName: (value: string, ) => void;
    onChangeStatus: (value: string) => void;
    onChangeDateRange: (dateStrings: [string, string]) => void;
    isDetailHotel: boolean;
}

export const BookingFilter = ({
                                  onReset,
                                  onChangeHotelName,
                                  onChangeStatus,
                                  onChangeDateRange,
                                  isDetailHotel
                              }
                                  : BookingFilterProps) => {
    const {data: hotelNamesData} = useGetListHotelNameQuery({});

    const hotelNameOptions = hotelNamesData?.map(hotel => {
        return {label: hotel.name, value: hotel.id}
    });
    hotelNameOptions?.unshift({label: 'Tất cả khách sạn', value: null});
    const [defaultStatus, setDefaultStatus] = useState("ALL");
    const [defaultHotelName, setDefaultHotelName] = useState("ALL");
    const [defaultDates, setDefaultDates] = useState< [dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

    const optionsStatus = [

        {label: 'All', value: 'ALL'},
        {label: 'Success', value: 'SUCCESS'},
        {label: 'Pending', value: 'PENDING'},
        {label: 'Cancel', value: 'CANCEL'},
        {label: 'Expired', value: 'EXPIRED'}
    ];
    console.log("hotelNameOptions", hotelNameOptions)
    const handleReset = () => {
        onReset && onReset();
        setDefaultStatus("ALL");
        setDefaultDates([null, null]);
    };
    const onChangeStatus1 = (value: string) => {
        setDefaultStatus(value);
        onChangeStatus && onChangeStatus(value);
    }
    const onChangeDateRange1 = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null], dateStrings: [string, string]) => {
        setDefaultDates(dates);
        onChangeDateRange && onChangeDateRange(dateStrings);
    }
    const onChangeHotelName1 = (value: string) => {
        console.log("value", value);
        setDefaultHotelName(value);
        onChangeHotelName && onChangeHotelName(value);
    }
    return (
        <StyledManagementFilter>
            {
                isDetailHotel ? null :  <Flex gap={6} align={"center"}>
                    <Text fontSize={"16px"} fontWeight={500}>
                        Khách sạn
                    </Text>
                    {
                        hotelNameOptions &&
                        <Select
                            value={defaultHotelName}
                            options={hotelNameOptions}
                            size={"large"}
                            onChange={onChangeHotelName1}
                            style={{width: 300}}
                        />
                    }
                </Flex>
            }

            <Flex gap={6} align={"center"}>
                <Text fontSize={"16px"} fontWeight={500}>
                    Trạng thái
                </Text>
                {
                    <Select
                        options={optionsStatus}
                        value={defaultStatus}
                        size={"large"}
                        onChange={onChangeStatus1}
                        style={{width: 200}}
                    />
                }
            </Flex>

            <Flex gap={6} align={"center"}>
                <Text fontSize={"16px"} fontWeight={500}>
                    Check-in & Check-out
                </Text>
                <RangePicker
                    value={defaultDates}
                    format="YYYY-MM-DD"
                    onChange={onChangeDateRange1}
                    size={"large"}

                />
            </Flex>
            <StyledResetButton style ={{
                marginLeft: "auto"
            }}>

                <Button
                    children={
                        <>
                            {" "}
                            <span>Làm mới</span>
                            <ReloadOutlined/>
                        </>
                    }
                    onClick={handleReset}
                />
            </StyledResetButton>
        </StyledManagementFilter>
    )
}
export const StyledManagementFilter = styled.div`
    margin: 12px 0;
    padding: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    border: 1px solid #f0f0f0;
    background-color: white;
    border-radius: 12px;
`;