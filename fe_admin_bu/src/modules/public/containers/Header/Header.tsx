import styled from "styled-components";
import {Button, Image, Menu, MenuProps, message} from "antd";
import {Container} from "public/containers/Container.tsx";
import {ModalSearch} from "public/components/Modal/ModalSearch.tsx";

import {CaretDownOutlined, UserOutlined} from "@ant-design/icons";
import Dropdown from "components/dropdown/Dropdown.tsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage} from "app/store/slice/appSlice.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {Link} from "react-router-dom";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";
import {useTranslation} from "react-i18next";
import {RootState} from "app/store/store.ts";
import {useEffect} from "react";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";
import {setCredentials} from "app/store/slice/authSlice.tsx";
import {LogoutReq, LogoutRes, User} from "authentication/models/User.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {useLogoutMutation} from "authentication/services/AuthSerivceApi.ts";
import useLoadUserProfileHook from "authentication/hook/useLoadUserProfileHook.tsx";

export const Header = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const { loadUserProfile } = useLoadUserProfileHook();
    const lang = useSelector((state: RootState) => state.appSlice.language);
    const userInfo: User | null = useSelector(
        (state: RootState) => state.auth.account ?? null
    );
    const token = localStorage.getItem("AccessToken");

    useEffect(() => {
        if(lang && token){
            loadUserProfile();
        }
    }, [lang]);
    const selectedLanguage = () => {
        switch (lang) {
            case "vi":
                return (
                    <div className={"selected-language"}>
                        <Text color="white" fontSize="14px">
                            VN
                        </Text>
                        <img src="src/assets/flag/vietnam.svg" alt=""/>
                    </div>
                )
            case "en":
                return (
                    <div className={"selected-language"}>
                        <Text color="white" fontSize="14px">
                            EN
                        </Text>
                        <img src="src/assets/flag/english.svg" alt=""/>
                    </div>
                )
        }
    };

    const closeLoadingMessage = () => {
        message.destroy("loadingKey");
    };
    const handleLogout = async () => {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("selectedItems");
        dispatch(setCredentials(null));
        const logoutReq: LogoutReq = {
            email: userInfo?.email || "",
        };
        closeLoadingMessage();
        const response:
            | { data: LogoutRes }
            | { error: FetchBaseQueryError | SerializedError } = await logout(
            logoutReq
        );
        closeLoadingMessage();
        if ("data" in response) {
            message.success("Đăng xuất thành công!!");
            // navigate(AuthorizationSiteMap.LOGIN);
        } else {
            message.error("Đăng xuất thất bại");
        }
    };
    const onChangeLanguage = (lang: string) => {
        dispatch(changeLanguage(lang));
        window.location.reload();
    };
    const languages = [
        {
            key: "1",
            label: `${t('language.vietnamese')}`,
            onClick: () => onChangeLanguage("vi"),
        },
        {
            key: "2",
            label: `${t('language.english')}`,
            onClick: () => onChangeLanguage("en"),
        },
    ];
    const menuItems: MenuProps['items'] = [
        {
            label: `${t('header.index')}`,
            key: "index"
        },
        {
            label: `${t('header.explore')}`,
            key: "explore"
        },
        {
            label: `${t('header.about')}`,
            key: "about"
        },
        {
            label: `${t('header.contact')}`,
            key: "contact"
        }

    ];

    const login = [
        {
            key: "1",
            label: (
                <Link rel="noopener noreferrer" to={AuthorizationSiteMap.LOGIN}>
                    {t('header.signIn')}
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <Link rel="noopener noreferrer" to={AuthorizationSiteMap.SIGNUP}>
                    {t('header.signUp')}
                </Link>
            ),
        },
    ];
    const loginSuccess = [
        {
            key: "1",
            label: (
                <Link rel="noopener noreferrer" to={AuthorizationSiteMap.PROFILE}>
                    Tài khoản
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <Link
                    rel="noopener noreferrer"
                    to={PublicSiteMap.INDEX}
                >
                    Đơn hàng
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

    return (
        <>
            <Container backgroundColor={"black"}>
                <div className={"flex-center-row"}>
                    <StyledLogo>
                        <Link to={PublicSiteMap.INDEX}>
                            <img src="src/assets/hotel_logo.png" alt=""/>
                        </Link>
                    </StyledLogo>

                    <StyledHeader>
                        <StyledHeaderTop>
                            <StyledLanguageDropdown placement="bottomLeft" items={languages}>
                                <button>
                                    {selectedLanguage()}
                                    <CaretDownOutlined/>
                                </button>
                            </StyledLanguageDropdown>
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
                                        <StyledButton color="white" className={"black-button"}>
                                            <UserOutlined/> {t('header.signIn')} / {t('header.signUp')}{" "}
                                            <CaretDownOutlined/>
                                        </StyledButton>
                                    </StyledDropdown>
                                )

                            }

                        </StyledHeaderTop>
                        <StyledHeaderBottom>
                            <StyledMenu
                                mode="horizontal"
                                items={menuItems}
                                theme="dark"
                            />
                            <ModalSearch
                                onSuccess={(value) => console.log(value)}
                                triggerChildren={t('header.search')}
                            />
                        </StyledHeaderBottom>

                    </StyledHeader>
                </div>
            </Container>


        </>

    )
};
const StyledLogo = styled.div`
    z-index: 10;

    img {
        width: 100px;
        height: 100px;
    }
`;
const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.black};
    height: 120px;
    width: 100%;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        img {
            width: 100px;
            height: 100px;
        }
    }
    @media (max-width: 576px) {
        height: 100px;
        img {
            width: 80px;
            height: 80px;
        }
    }
`;
const StyledHeaderTop = styled.div`
    margin: 10px;
    display: flex;
    justify-content: flex-end;
`;
const StyledHeaderBottom = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const StyledMenu = styled(Menu)`
    color: white;
    justify-content: flex-end;
    background-color: black;
    margin-right: 10%;

    button {
        background-color: black;
        color: white;
        width: fit-content;
        border: none;
        font-size: 16px;
        cursor: pointer;

    }

    .ant-menu-title-content {
        color: white;
        font-size: 20px;
    }
`;
const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    background-color: black;
    color: white;
    width: fit-content;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 1s ease-in-out;
`;

const StyledLanguageDropdown = styled(Dropdown)`
    border: none;
    background-color: black;
    display: flex;
    gap: 5px;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;

    .selected-language {
        display: flex;
        align-items: center;

        img {
            width: 20px;
            height: 20px;
            margin-left: 2px;
        }
    }

    .anticon {
        color: white;
    }
`;
const StyledDropdown = styled(Dropdown)`
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
