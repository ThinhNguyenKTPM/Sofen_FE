import styled from "styled-components";
import {Container} from "public/containers/Container.tsx";
import {Link} from "react-router-dom";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";
import {Flex} from "antd";

export const BookingHeader = () => {
    const steps=
        [
            {
                title: 'Finished',
                description,
            },
            {
                title: 'In Progress',
                description,
                subTitle: 'Left 00:00:08',
            },
            {
                title: 'Waiting',
                description,
            },
        ]
    return (
        <Container backgroundColor={"black"}>
            <StyledBookingHeader>
                <StyledLogo>
                    <Link to={PublicSiteMap.INDEX}>
                        <img src="src/assets/hotel_logo.png" alt=""/>
                    </Link>
                </StyledLogo>
            </StyledBookingHeader>

        </Container>
    )
};
const StyledBookingHeader = styled(Flex)`
    align-items: center;
    height: 120px
`;
const StyledLogo = styled.div`
    z-index: 10;
    img {
        width: 100px;
        height: 100px;
    }
`;