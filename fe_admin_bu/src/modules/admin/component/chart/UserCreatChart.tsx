import {Menu, MenuProps} from "antd";
import styled from "styled-components";
import {useGetUserCreateQuery} from "@/modules/admin/services/UserManagementService.ts";
import {useState} from "react";
import LineChart, {LineChartData} from "@/modules/admin/component/chart/LineChart.tsx";

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

export const UserCreatChart = () => {
    const [paramsQuery, setParamsQuery] = useState({
        time: "month",
    });
    const {data: res} = useGetUserCreateQuery(paramsQuery);

    const items: MenuItem[] = [
        getItem('Ngày', 'date'),
        getItem('Tuần', 'week'),
        getItem('Tháng', 'month'),
        getItem('Năm', 'year'),
    ];
    const menuOnClick = (key: string) => {
        setParamsQuery({
            time: key,
        });
    }
    const data = {
        label: "Người dùng",
        data: res?.map((item) => item.count),
        backgroundColor: "#064FF0",
        borderColor: "#064FF0",
    } as LineChartData;
    const datasets = [];
    datasets.push(data);
    const labels = res?.map((item) => item.label);
    return (

        <>
            <div style={{height: "40px"}}>

            </div>
            <StyledLineChart>
                <StyledMenu
                    mode="horizontal"
                    defaultSelectedKeys={['month']}
                    theme="light"
                    items={items}
                    onClick={(e) => menuOnClick(e.key)}
                />
                {
                    res && <LineChart
                        label={labels}
                        data={datasets}
                        title={"Biểu đồ người dùng tạo mới"}
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
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;