import styled from "styled-components";
import {Container} from "public/containers/Container.tsx";
import {ModalContact} from "public/components/Modal/ModalContact.tsx";
import {Button} from "components/button/Button.tsx";
import {useTranslation} from "react-i18next";

export const Slogan = () => {
    const {t} = useTranslation();
    return (
        <Container backgroundColor={"black"}>
            <StyledSlogan>
                <h1>
                    {t('homePage.slogan.title1')}<br/>
                    {t('homePage.slogan.title2')}
                </h1>
                <StyledSloganNav>
                    <Button className={"black-button"}>
                         <span>
                            {t('homePage.slogan.search')}
                         </span>
                    </Button>

                    {/*Xử lý sự kiện khi click vào nút "about"*/}
                    <Button className={"black-button"}>
                         <span>
                            {t('homePage.slogan.about')}
                         </span>
                    </Button>
                    <ModalContact/>
                </StyledSloganNav>
            </StyledSlogan>

        </Container>

    )
};

const StyledSlogan = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 150px;
    color: ${props => props.theme.colors.white};
    padding-bottom: 20px;
    h1 {
        margin: 0;
        text-transform: uppercase;
        font-size: 40px;
    }
    button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        font-size: 16px;
        background-color: black;
        color: white;
        border-radius: 0;
        border: none;
        cursor: pointer;
        border-bottom: 2px solid white;
        width: 200px;
        padding-left: 15px;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        h1 {
            font-size: 30px;
        }
    }
`;
const StyledSloganNav = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        flex-direction: row;
        padding-bottom: 20px;
        gap: 10px;
        justify-content: center;
    }
`;