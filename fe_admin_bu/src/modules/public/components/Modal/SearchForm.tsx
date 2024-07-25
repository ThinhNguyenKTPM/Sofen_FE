import styled from "styled-components";
import {DatePicker, Flex} from "antd";
import {Text} from "components/typhograpy/Text.tsx";
import Select from "components/form/Select.tsx";
import dayjs from "dayjs";
import BaseInput from "components/form/BaseInput.tsx";
import {RangePickerProps} from "antd/es/date-picker";
import {FormikProvider} from "formik";
import {BaseErrorMessage} from "components/form/BaseErrorMessage.tsx";
import {useGetListHotelNameQuery} from "@/modules/public/services/HotelServiceApi.ts";

export interface SearchFormProps {
    onChangeHotelName: (value: string) => void;
    onChangeCheckInDate: (value: string) => void;
    isDisplayHotelName?: boolean;
    formik: any;
}

export const SearchForm = ({onChangeHotelName, onChangeCheckInDate, formik, isDisplayHotelName}: SearchFormProps) => {
    const {RangePicker} = DatePicker;
    const {data: hotelNamesData, error, isLoading} = useGetListHotelNameQuery({});

    const hotelNameOptions = hotelNamesData?.map(hotel => {
        return {label: hotel.name, value: hotel.id}
    });
    console.log(hotelNamesData);

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    }
    const onChangeRang = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null], dateStrings: [string, string]) => {
        formik.setFieldValue("checkIn", dateStrings[0]);
        formik.setFieldValue("checkOut", dateStrings[1]);
    }
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.code);
        if (e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    }
    return (

        <FormikProvider value={formik}>


            <StyledSearchForm>
                {
                    isDisplayHotelName &&
                    <StyledInputGroup>
                        <Text fontSize={"16px"} fontWeight={500}>
                            Khách sạn
                        </Text>
                        <Select

                            options={hotelNameOptions}
                            placeholder={"Chọn khách sạn"}
                            size={"large"}
                            name={"hotelName"}
                            onChange={onChangeHotelName}
                        />
                        <BaseErrorMessage name={"hotelId"}/>
                    </StyledInputGroup>
                }

                <Flex wrap={"wrap"} gap={"8px"}>
                    <StyledInputGroup>
                        <Text fontSize={"16px"} fontWeight={500}>
                            Check-in & Check-out Dates
                        </Text>
                        <RangePicker
                            defaultValue={[dayjs().add(1, 'day'), dayjs().add(2, 'day')]}
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD"
                            onChange={onChangeRang}
                            size={"large"}

                        />

                    </StyledInputGroup>

                    <Flex wrap={"wrap"} gap={"8px"}>
                        <StyledInputGroup>
                            <Text fontSize={"16px"} fontWeight={500}>
                                Người lớn
                            </Text>
                            <BaseInput
                                name={"adults"}
                                size={"large"}
                                type={"number"}
                                min={1}
                                onKeyPress={(e) => onKeyPress(e)}
                            >
                            </BaseInput>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <Text fontSize={"16px"} fontWeight={500}>
                                Trẻ em
                            </Text>
                            <BaseInput
                                name={"children"}
                                size={"large"}
                                type={"number"}
                                min={0}
                                onKeyPress={(e) => onKeyPress(e)}>
                            </BaseInput>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <Text fontSize={"16px"} fontWeight={500}>
                                Phòng
                            </Text>
                            <BaseInput
                                name={"roomAmount"}
                                size={"large"} type={"number"}
                                min={1}
                                onKeyPress={(e) => onKeyPress(e)}
                            >
                            </BaseInput>
                        </StyledInputGroup>
                    </Flex>
                </Flex>
            </StyledSearchForm>
        </FormikProvider>
    )
};


const StyledSearchForm = styled(Flex)`
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
`;
const StyledInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 4px;
    margin: 6px 0;
`;