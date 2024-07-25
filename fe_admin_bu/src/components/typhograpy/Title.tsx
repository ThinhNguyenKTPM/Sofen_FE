import { Typography } from "antd";
import { TitleProps as TitlePropsAntd } from "antd/es/typography/Title";
import styled from "styled-components";

import JambonoFont from "./font/JambonoFont.ttf";
import {appConfig} from "app/config/AppConfig.ts";

const TitleAntd = Typography.Title;

interface TitleProps extends TitlePropsAntd {
    color?: string;
}

export const Title = ({ children, color, ...props }: TitleProps) => {
    return (
        <StyledText color={color} {...props}>
            {children}
        </StyledText>
    );
};

const StyledText = styled(TitleAntd)<{ fontSize?: string; color?: string }>`
    &&& {
        color: ${(props) => props.color || "#333"};
        display: inline-block; 
    }
    font-feature-settings: "clig" off, "liga" off;
    font-family: "JambonoVN Black", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    @font-face {
        font-family: "JambonoVN Black";
        src: url(${JambonoFont}) format("opentype");
        font-weight: 700;
    }
    @media (min-width: ${appConfig.breakpoints.md}) {
        font-size: 20px;
        line-height: 30px;
    }
    @media (min-width: 992px) {
        font-size: 24px;
        line-height: 36px;
    }
    
`;