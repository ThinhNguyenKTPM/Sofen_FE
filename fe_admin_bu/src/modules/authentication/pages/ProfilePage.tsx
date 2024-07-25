import {MainPage} from "public/pages/PublicPage.tsx";
import Slider from "authentication/components/profile/Slider.tsx";
import {Container} from "public/containers/Container.tsx";
import {UserInfo} from "authentication/containers/profile/UserInfor.tsx";
import {User} from "authentication/models/User.ts";
import {useSelector} from "react-redux";
import {RootState} from "app/store/store.ts";
import {Flex} from "antd";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {BookingHistory} from "authentication/containers/profile/BookingHistory.tsx";
import {PasswordSetting} from "authentication/containers/profile/PasswordSetting.tsx";

export const ProfilePage = () => {
    const userInfo: User | null = useSelector(
        (state: RootState) => state.auth.account ?? null
    );
    const [display, setDisplay] = useState<number>(1);

    useEffect(() => {

    }, [userInfo]);
    const menuOnClick = (e: string) => {
        setDisplay(parseInt(e));
    }

    let renderedComponent;
    switch (display) {
        case 1:
            renderedComponent = <UserInfo />;
            break;
        case 2:
            renderedComponent = <BookingHistory />;
            break;
        case 3:
            renderedComponent = < PasswordSetting />;
            break;
    }
    return (
        <MainPage>
            <Container>
                <StyledSiderProfile>
                    <Slider
                        display={display}
                        menuOnClick={menuOnClick}
                        userInfo={userInfo}
                    />
                    {renderedComponent}
                </StyledSiderProfile>

            </Container>
        </MainPage>
    )
};

const StyledSiderProfile = styled(Flex)`
    height: 100%;
    //max-width: 60vw;
`;