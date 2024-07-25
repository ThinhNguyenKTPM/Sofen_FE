
import {ReactNode} from "react";
import styled from "styled-components";
export interface MainPageProps {
    children?: ReactNode;
}
export const MainPage = ({children}: MainPageProps) => {
    return (
        <StyledMainPage>
            {children}
        </StyledMainPage>
    );
}
const StyledMainPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;