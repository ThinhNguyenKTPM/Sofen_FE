import { Typography } from "antd";
import { TextProps as TextPropsAntd } from "antd/es/typography/Text";
import styled from "styled-components";

const TextAntd = Typography.Text;

interface TextProps extends TextPropsAntd {
    fontSize?: string;
    fontWeight?: number;
    color?: string;
}

export const Text = ({ color, children, fontSize, fontWeight, ...props }: TextProps) => {
    return (
        <StyledText fontSize={fontSize} color={color} fontWeight = {fontWeight} {...props}>
            {children}
        </StyledText>
    );
};

const StyledText = styled(TextAntd)<{ fontSize?: string, fontWeight? : number }>`
    color: ${(props) => props.color || "#333"};
    font-feature-settings: "clig" off, "liga" off;
    font-family: KoHo;
    font-size: ${(props) => props.fontSize || "12px"};
    font-style: normal;
    font-weight: ${(props) => props.fontWeight || 700};

    line-height: 18px; /* 150% */
`;
