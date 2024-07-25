import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {
    useGetBookingCreateQuery,
    useGetBookingProfitQuery,
    useGetBookingProfitTimeQuery
} from "@/modules/admin/services/BookingManagementService.ts";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useCountHotelQuery, useCountUserQuery} from "@/modules/admin/services/UserManagementService.ts";
import {formatNumberWithCommas, RoleEnum} from "@/modules/admin/model/UserManagement.ts";
import DashboardCard from "@/modules/admin/component/DashboardCard.tsx";
import {BankOutlined, DollarOutlined, UserOutlined} from "@ant-design/icons";
import {Flex} from "antd";
import {useGetListHotelNameQuery} from "public/services/HotelServiceApi.ts";
import {UserCreatChart} from "@/modules/admin/component/chart/UserCreatChart.tsx";
import {Title} from "components/typhograpy/Title.tsx";
import {HotelProfitChart} from "@/modules/admin/component/chart/HotelProfitChart.tsx";

export interface Profit {
    date: string;
    count: number;
}

export const Dashboard = () => {
    const {data: res} = useGetBookingCreateQuery({
        time: "day",
        type: "all"
    });
    const {data: userCount} = useCountUserQuery({role: RoleEnum.ROLE_USER});
    const {data: hotelCount} = useCountHotelQuery({});
    const {data: hotelsProfit} = useGetBookingProfitQuery({
        type: "all"
    });

    console.log("Hotels profit:", hotelsProfit);
    const [count, setCount] = useState([]);
    const [date, setDate] = useState([]);
    useEffect(() => {
        if (res) {
            setCount(res.map(item => item.count));
            setDate(res.map(item => item.date));
        }
    }, [res]);


    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    const {data: hotelNamesData} = useGetListHotelNameQuery({});
    return (
        <AdminPage
            className="customers-page"
            defaultSelectedValue={"Dashboard"}
        >
            <Title children={"Dashboard"} level={5}/>
            <Flex>
                {
                    userCount && <DashboardCard
                        icon={<UserOutlined/>}
                        quantity={userCount.count}
                        title={"Người đăng ký"}
                    />
                }
                {
                    hotelCount && <DashboardCard
                        icon={<BankOutlined/>}
                        quantity={hotelCount.count}
                        title={"Khách sạn"}
                    />
                }
                {
                    hotelsProfit && <DashboardCard
                        icon={<DollarOutlined />}
                        quantity={ formatNumberWithCommas(hotelsProfit[0].label) + " VND"}
                        title={"Tổng Doanh thu"}
                    />
                }
            </Flex>
            <Flex gap={20} align={""}>
                <StyledChart>
                    <UserCreatChart />
                </StyledChart>
                <StyledChart>
                    <HotelProfitChart/>
                </StyledChart>
            </Flex>


        </AdminPage>
    )
}

const StyledChart = styled.div`
    width: 700px;
`