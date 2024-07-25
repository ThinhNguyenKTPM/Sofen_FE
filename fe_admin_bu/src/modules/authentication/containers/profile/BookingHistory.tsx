import styled from "styled-components";
import {BookingHistoryCard} from "authentication/components/profile/BookingHistoryCard.tsx";
import {BookingHistoryReq, BookingHistoryRes} from "authentication/models/BookingHistory.ts";
import {useEffect, useState} from "react";
import {useGetBookingHistoryQuery} from "authentication/services/BookingHistoryService.ts";
import {Pagination} from "components/pagination/Pagination.tsx";
import {Title} from "components/typhograpy/Title.tsx";
import {Menu, MenuProps, Spin} from "antd";
import {ContainerOutlined, DesktopOutlined, UserOutlined} from "@ant-design/icons";
import {getItem} from "authentication/components/profile/Slider.tsx";

type MenuItem = Required<MenuProps>['items'][number];

export const BookingHistory = () => {


    const [paramsQuery, setParamsQuery] = useState<BookingHistoryReq>({
        page: 1,
        size: 10,
    });
    const {data: res, isLoading, refetch} = useGetBookingHistoryQuery(paramsQuery);
    useEffect(() => {
        refetch();
    }, [paramsQuery]);
    useEffect(() => {
        console.log("res", res);
    }, [res]);

    const [pageNumber, setPageNumber] =
        useState(res?.pageable.pageNumber ?? 0);
    const bookingCards = res?.content;
    console.log("booking card", bookingCards);
    const items: MenuItem[] = [
        getItem('ALL', 'ALL', <UserOutlined/>),
        getItem('SUCCESS', 'SUCCESS', <DesktopOutlined/>),
        getItem('PENDING', 'PENDING', <ContainerOutlined/>),
        getItem('CANCEL', 'CANCEL', <UserOutlined/>),
        getItem('EXPIRED', 'EXPIRED', <UserOutlined/>),
    ];
    const menuOnClick = (key: string) => {
        console.log("e", key);
        setParamsQuery({
            page: 1,
            size: 10,
            status: key
        })
    }
    return (
        <StyledBookingHistory>
            <Title level={4}>Booking History</Title>
            <StyledMenu
                mode="horizontal"
                defaultSelectedKeys={['ALL']}
                defaultOpenKeys={['sub1']}
                theme="light"
                items={items}
                onClick={(e) => menuOnClick(e.key)}
            />
            {
                isLoading == true ?
                    <StyledNotFound>
                        <Spin> Loading</Spin>
                    </StyledNotFound>
                    : (
                        bookingCards && bookingCards.length == 0 ?
                            <StyledNotFound>
                                <Title level={5}>No booking history</Title>
                            </StyledNotFound>
                            :
                            (
                                bookingCards && bookingCards.map((bookingCard: BookingHistoryRes) => (
                                    <BookingHistoryCard bookingCard={bookingCard}>
                                    </BookingHistoryCard>
                                ))
                            )
                    )

            }
            {
                bookingCards && bookingCards.length !== 0 &&
                <StyledPagination
                    pageSize={paramsQuery.size}
                    total={res?.totalElements}
                    current={pageNumber + 1}
                    onChange={(page) => {
                        console.log("page", page);
                        setPageNumber(page - 1);
                        setParamsQuery({
                            ...paramsQuery,
                            page: page
                        })
                    }}
                />
            }
        </StyledBookingHistory>
    );
}
const StyledBookingHistory = styled.div`
    width: 100%;
    padding: 20px 30px;
    min-height: 500px;
    position: relative;
`;
const StyledMenu = styled(Menu)`
    margin: 12px 0 25px;
    padding: 2px 0;
    border: 1px solid #f0f0f0;
    border-bottom: none;
    border-radius: 12px 12px 0 0;

    .ant-menu-inline .ant-menu-item {
        height: 50px !important;
    }

    &.ant-menu-horizontal {

    }
`
const StyledNotFound = styled.div`
    width: 100%;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledPagination = styled(Pagination)`
    margin-top: 10px;
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
`
