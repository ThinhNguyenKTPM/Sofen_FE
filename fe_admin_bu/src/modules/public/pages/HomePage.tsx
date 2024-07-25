import {MainPage} from "public/pages/PublicPage.tsx";
import {Slogan} from "public/containers/HomePage/Slogan.tsx";
import {Carousel} from "antd";
import styled, {keyframes} from "styled-components";
import {Services} from "public/containers/HomePage/Services.tsx";
import {ReasonsOfChoice} from "public/containers/HomePage/ChoisedReasons.tsx";
import {Rooms} from "public/containers/HomePage/Rooms.tsx";
import {Container} from "public/containers/Container.tsx";
import {ExploreHotels} from "public/containers/HomePage/ExploreHotels.tsx";
import {Utilities} from "public/containers/HomePage/Utilities.tsx";

export const HomePage = () => {
    window.scrollTo(0, 0);
    return (
        <MainPage>
            <Slogan/>
            <Carousel autoplay>
                <StyledCarousel>
                    <img src="src/assets/HomePage/carousel/carousel.png" alt=""/>
                </StyledCarousel>
                <StyledCarousel>
                    <img src="src/assets/HomePage/carousel/carousel1.png" alt=""/>
                </StyledCarousel>
                <StyledCarousel>
                    <img src="src/assets/HomePage/carousel/carousel3.png" alt=""/>
                </StyledCarousel>
                <StyledCarousel>
                    <img src="src/assets/HomePage/carousel/carousel2.jpg" alt=""/>
                </StyledCarousel>
            </Carousel>
            <Container backgroundColor={"white"}>
                <Services/>
                <ReasonsOfChoice/>
                <Rooms/>
            </Container>
            <ExploreHotels />
            <Utilities />
        </MainPage>
    );
}
const zoomIn = keyframes`
    0% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
`;
const StyledCarousel = styled(Carousel)`
    background-color: black;
    img {
        height: 30vw;
        animation: ${zoomIn} 1s ease-in-out;
    }
`;