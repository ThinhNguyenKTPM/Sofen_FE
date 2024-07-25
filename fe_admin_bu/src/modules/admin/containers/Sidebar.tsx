import {
    BarcodeOutlined, CaretDownOutlined,
    DatabaseOutlined,
    HomeOutlined,
    SnippetsOutlined,
    SolutionOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Button, Flex, Image, Layout, Menu, message} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import React, {useEffect} from "react";
import styled from "styled-components";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {AdminSiteMap} from "@/modules/admin/routers/AdminSiteMap.ts";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {LogoutReq, LogoutRes, User} from "authentication/models/User.ts";
import {RootState} from "app/store/store.ts";
import {useLogoutMutation} from "authentication/services/AuthSerivceApi.ts";
import {setCredentials} from "app/store/slice/authSlice.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";
import {appConfig} from "app/config/AppConfig.ts";
import Dropdown from "components/dropdown/Dropdown.tsx";
import useLoadUserProfileHook from "authentication/hook/useLoadUserProfileHook.tsx";

export interface SidebarProps {
    children: React.ReactNode;
    defaultSelectedValue?: string;
}

export const Sidebar = ({children, defaultSelectedValue}: SidebarProps) => {

    const {t} = useTranslation();
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const {loadUserProfile} = useLoadUserProfileHook();

    const userInfo: User | null = useSelector(
        (state: RootState) => state.auth.account ?? null
    );
    const [logout] = useLogoutMutation();
    const openLoadingMessage = () => {
        message.loading({
            content: "Loading...",
            key: "loadingKey",
            duration: 0,
        });
    };
    const token = localStorage.getItem("AccessToken");

    useEffect(() => {
        if (token) {
            loadUserProfile();
        }
    }, []);
    const closeLoadingMessage = () => {
        message.destroy("loadingKey");
    };
    const handleLogout = async () => {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("selectedItems");
        disPatch(setCredentials(null));
        const logoutReq: LogoutReq = {
            email: userInfo?.email || "",
        };
        openLoadingMessage();
        const response:
            | { data: LogoutRes }
            | { error: FetchBaseQueryError | SerializedError } = await logout(
            logoutReq
        );
        closeLoadingMessage();
        if ("data" in response) {
            message.success("Đăng xuất thành công!!");
            navigate(AuthorizationSiteMap.LOGIN);
        } else {
            message.error("Đăng xuất thất bại");
        }
    };
    const login = [
        {
            key: "1",
            label: (
                <Link rel="noopener noreferrer" to={AuthorizationSiteMap.LOGIN}>
                    Đăng nhập
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <Link
                    rel="noopener noreferrer"
                    to={AuthorizationSiteMap.SIGNUP}
                >
                    Đăng ký
                </Link>
            ),
        },
    ];
    const loginSuccess = [
        {
            key: "1",
            label: (
                <Link rel="noopener noreferrer" to="/account/profile">
                    Tài khoản
                </Link>
            ),
        },
        {
            key: "3",
            label: (
                <Link rel="noopener noreferrer" to="#" onClick={handleLogout}>
                    Đăng xuất
                </Link>
            ),
        },
    ];
    const items = [
        {
            key: "1",
            icon: React.createElement(HomeOutlined),
            label: <NavLink to={AdminSiteMap.INDEX} children={"Dashboard"}/>,
        },
        {
            key: "2",
            icon: React.createElement(BarcodeOutlined),
            label: (
                <NavLink
                    to={AdminSiteMap.BOOKINGS_MANAGEMENT}
                    children={"Booking"}
                />
            ),
        },
        {
            key: "3",
            icon: React.createElement(DatabaseOutlined),
            label: (
                <NavLink
                    to={AdminSiteMap.HOTELS_MANAGEMENT}
                    children={"Hotel"}
                />
            ),
        },
        // {
        //     key: "4",
        //     icon: React.createElement(SnippetsOutlined),
        //     label: (
        //         <NavLink
        //             to={AdminSiteMap.ROOM_MANAGEMENT}
        //             children={"Phòng"}
        //         />
        //     ),
        // },
        // {
        //     key: "5",
        //     icon: React.createElement(SnippetsOutlined),
        //     label: (
        //         <NavLink
        //             to={AdminSiteMap.SERVICES_MANAGEMENT}
        //             children={"Dịch vụ"}
        //         />
        //     ),
        // },
        {
            key: "6",
            icon: React.createElement(UploadOutlined),
            label: (
                <NavLink
                    to={AdminSiteMap.POLICIES_MANAGEMENT}
                    children={"Chính sách"}
                />
            ),
        },
        {
            key: "7",
            icon: React.createElement(UserOutlined),
            label: (
                <NavLink
                    to={AdminSiteMap.CUSTOMERS_MANAGEMENT}
                    children={"Khách hàng"}
                />
            ),
        },
        {
            key: "8",
            icon: React.createElement(SolutionOutlined),
            label: (
                <NavLink
                    to={AdminSiteMap.FURNITURE_ROOM}
                    children={"Nội thất phòng"}
                />
            ),
        },
    ];
    const defaultSelectedIndex =
        items.find((obj) => obj.label.props.children === defaultSelectedValue)
            ?.key ?? "";
    const defaultSelectedKeys = [];
    defaultSelectedKeys.push(defaultSelectedIndex);


    return (
        <StyledLayout>
            <Flex style={{
                width: "100%",
            }}>
                <StyledSider
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{
                        backgroundColor: "#071251",
                        width: "initial"
                    }}
                >
                    <div
                        className="demo-logo-vertical"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(AdminSiteMap.INDEX)}
                    >
                        <img
                            src="https://lh3.googleusercontent.com/a/ACg8ocK7jPY_Ar7KoTYK4dqRWDDkWePP866VsC9S-tYIxTq3GXmld08=s360-c-no"
                            alt=""
                            style={{width: "80px"}}
                        />
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={defaultSelectedKeys}
                        items={items}
                    />
                </StyledSider>
                <StyledLayoutContent>
                    <StyledHeader>
                        {
                            userInfo && userInfo.email ? (
                                <StyledDropdown placement="bottomLeft" items={loginSuccess}>
                                    <StyledButton color="white">
                                        {userInfo.avatar ? (
                                            <Image
                                                src={userInfo.avatar}
                                                preview={false}
                                                style={{
                                                    width: "25px",
                                                    height: "25px",
                                                    borderRadius: "50%",
                                                    // border: "1px solid #fff",
                                                }}/>
                                        ) : (
                                            <UserOutlined/>
                                        )}
                                        <span style={{
                                            overflow: "hidden",
                                        }}>{userInfo.fullName}</span>
                                        <CaretDownOutlined/>
                                    </StyledButton>
                                </StyledDropdown>
                            ) : (
                                <StyledDropdown placement="bottomLeft" items={login}>
                                    <StyledButton color="white">
                                        <UserOutlined/> {t('header.signIn')} / {t('header.signUp')}{" "}
                                    </StyledButton>
                                </StyledDropdown>
                            )

                        }
                    </StyledHeader>
                    <StyledContent>
                        <div
                            style={{
                                padding: 12,
                                background: "#f5f5f5",
                            }}
                        >
                            {children}
                        </div>
                    </StyledContent>
                </StyledLayoutContent>

            </Flex>

        </StyledLayout>
    );
};
const StyledLayout = styled(Layout)`
    display: flex;

    .ant-layout {
        background-color: #fefefe;
    }
`;

const StyledSider = styled(Sider)`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    color: white;

    .ant-menu {
        width: 180px;
    }

    .ant-menu-item {
        color: white;

        .ant-menu-item-icon {
            color: white;
        }
    }

    .ant-menu .ant-menu-item {
        background-color: #071251;
        margin: 0;
        width: 200px;
        height: 40px;
        border-radius: 0;

        .ant-menu-title-content {
            color: #e0e0e0;
            margin: 0px auto 0px 20px;
            font-family: KoHo;
            font-weight: bold;
            font-size: 16px;
        }
    }

    .ant-menu-item .ant-menu-item-active {
        :hover {
            background-color: #5270d0;
        }
    }

    .ant-menu-light:not(.ant-menu-horizontal)
    .ant-menu-item:not(.ant-menu-item-selected):hover {
        background-color: #5270d0;
    }

    .ant-menu-light .ant-menu-item-selected {
        color: white;
        background-color: #4634ff;
        border-radius: 0;
    }
`;

const StyledLayoutContent = styled(Flex)`
    flex-direction: column;
    background-color: #84c7d3;
    border-left: 1px solid #e0e0e0;
    width: calc(100% - 200px);

    .ant-layout-content {
        margin-left: 0;
    }
`;

const StyledButton = styled(Button)`
    margin-right: 24px;
    margin-left: auto;
    background-color: #e0e0e0;
    font-weight: bold;
    padding: 3px 15px;
    color: ${appConfig.colors.txt} !important;
    border: none;

    &:hover {
        background-color: #e0e0e0 !important;
        color: #4634ff !important;
    }

    img {
        margin-right: 2px;
    }
`;
const StyledDropdown = styled(Dropdown)`
    height: 30px;
    display: flex;
    //justify-content: space-around;
    align-items: center;
`;
const StyledHeader = styled(Header)`
    display: flex;
    padding: 0;
    background: #071251;
    height: 80px;
    align-items: center;

    > div {
        margin-left: 20px;
        width: 500px;
    }

    > div:last-child {
        margin-left: auto;
    }
`;

const StyledContent = styled(Content)`
    background: #f5f5f5;
    overflow-y: auto;
    height: 1000px;

    .ant-typography {
        margin-top: 0;
    }
`;

