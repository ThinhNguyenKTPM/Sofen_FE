import {Flex, Menu, MenuProps, Select} from "antd";
import styled from "styled-components";
import {useGetUserCreateQuery} from "@/modules/admin/services/UserManagementService.ts";
import {useState} from "react";
import LineChart, {LineChartData} from "@/modules/admin/component/chart/LineChart.tsx";
import {useGetBookingProfitTimeQuery} from "@/modules/admin/services/BookingManagementService.ts";
import {useGetListHotelNameQuery} from "public/services/HotelServiceApi.ts";
import {Text} from "components/typhograpy/Text.tsx";

type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const HotelProfitChart = () => {
    const defaultQuery = {
        time: "day",
        type: "all",
        hotelId: undefined
    };
    const [paramsQuery, setParamsQuery] = useState(defaultQuery);

    const {data: bookingProfitsTime} = useGetBookingProfitTimeQuery(paramsQuery);
    const {data: hotelNamesData} = useGetListHotelNameQuery({});
    console.log("Booking profits time:", bookingProfitsTime);
    const hotelNameOptions = hotelNamesData?.map(hotel => {
        return {label: hotel.name, value: hotel.id}
    });

    const userOption = [
        {
            value: "all",
            label: "TẤT CẢ",
        },
        {
            value: "user",
            label: "Khách hàng có tài khoản",
        },
        {
            value: "unuser",
            label: "Khách vãng lai",
        }

    ];
    const [defaulCustomer, setDefaultCustomer] = useState("all");
    const [defaultHotelName, setDefaultHotelName] = useState("ALL");
    hotelNameOptions?.unshift({label: 'Tất cả khách sạn', value: null});
    const items: MenuItem[] = [
        getItem('Ngày', 'day'),
        getItem('Tuần', 'week'),
        getItem('Tháng', 'month'),
        getItem('Năm', 'year'),
    ];


    const menuOnClick = (key: string) => {
        setParamsQuery({
            ...paramsQuery,
            time: key
        });
    }
    const data = {
        label: "Doanh Thu",
        data: bookingProfitsTime?.map((item) => item.count),
        // backgroundColor: "#064FF0",
        // borderColor: "#064FF0",
    } as LineChartData;
    const datasets = [];
    datasets.push(data);
    const labels = bookingProfitsTime?.map((item) => item.label);

    const onChangeHotelName1 = (value: string) => {
        setDefaultHotelName(value);
        if (!value) {
            value = undefined;
        }
        setParamsQuery({
            ...paramsQuery,
            hotelId: value
        });
    }
    const onChangeCustomer = (value: string) => {
        setDefaultCustomer(value);
        if (value == "undefined") {
            value = undefined;
        }
        setParamsQuery({
            ...paramsQuery,
            type: value
        });
    }
    const genTitle = () => {
        if (defaultHotelName == "ALL") {
            return "Biểu đồ doanh thu toàn hệ thống";
        }
        const hotelName = hotelNameOptions?.map((item) => item.value == defaultHotelName)[0];
        return `Biểu đồ doanh thu của khách sạn`;
    }
    return (
        <>

            <Flex gap={6}>
                <Flex gap={6} align={"center"}>
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
                <Flex gap={6} align={"center"}>
                    <Text fontSize={"16px"} fontWeight={500}>
                        Khách hàng
                    </Text>
                    {
                        <Select
                            value={defaulCustomer}
                            options={userOption}
                            size={"large"}
                            onChange={onChangeCustomer}
                            style={{width: 200}}
                        />
                    }
                </Flex>
            </Flex>

            <StyledLineChart>
                <StyledMenu
                    mode="horizontal"
                    defaultSelectedKeys={['month']}
                    theme="light"
                    items={items}
                    onClick={(e) => menuOnClick(e.key)}
                />
                {
                    bookingProfitsTime && <LineChart
                        label={labels}
                        data={datasets}
                        title={genTitle()}
                    />
                }


            </StyledLineChart>
        </>

    );
}

const StyledMenu = styled(Menu)`
    padding: 0;
    border-bottom: none;

    .ant-menu-inline .ant-menu-item {
        height: 30px !important;
    }
`
const StyledLineChart = styled.div`
    margin-top: 10px;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;