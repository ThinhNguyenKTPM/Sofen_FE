import styled from "styled-components";
import {Container} from "public/containers/Container.tsx";
import {useTranslation} from "react-i18next";

export const Services = () => {
    const {t} = useTranslation();
    return (
        <Container backgroundColor={"white"}>
            <StyledServies>
                <StyledServiceItems>
                    <div className={"service-icon"}>
                        <img src="src/assets/HomePage/HotelServices/drink.svg" alt=""/>
                    </div>
                    <span>
                    {t('homePage.services.drink')}
              </span>
                </StyledServiceItems>
                <StyledServiceItems>
                    <div className={"service-icon"}>
                        <img src="src/assets/HomePage/HotelServices/car.svg" alt=""/>
                    </div>
                    <span>
                    {t('homePage.services.pickUp')}
              </span>
                </StyledServiceItems>
                <StyledServiceItems>
                    <div className={"service-icon"}>
                        <img src="src/assets/HomePage/HotelServices/spa.svg" alt=""/>
                    </div>
                    <span>
                    {t('homePage.services.spa')}
              </span>
                </StyledServiceItems>
                <StyledServiceItems>
                    <div className={"service-icon"}>
                        <img src="src/assets/HomePage/HotelServices/wifi.svg" alt=""/>
                    </div>
                    <span>
                    {t('homePage.services.wifi')}
              </span>
                </StyledServiceItems>
            </StyledServies>
        </Container>

    )
}
const StyledServies = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const StyledServiceItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    width: 20%;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    .service-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 74px;
        height: 74px;
        background-color: #fffaf5;
        border-radius: 50%;
    }

    span {
        margin-left: 10px;
        font-family: KoHo;
        font-size: 16px;
        font-weight: 600;
        color: #565656;
    }
`;