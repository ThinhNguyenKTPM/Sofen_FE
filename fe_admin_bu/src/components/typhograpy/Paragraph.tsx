import { Typography } from "antd";
import { ParagraphProps as antParagraphProps } from "antd/es/typography/Paragraph";
import styled from "styled-components";

const TextAntd = Typography.Paragraph;

interface ParagraphProps extends antParagraphProps {
    fontSize?: string;
    color?: string;
}

export const Paragraph = ({ color, children, fontSize, ...props }: ParagraphProps) => {
    return (
        <StyledText fontSize={fontSize} color={color} {...props}>
            {children}
        </StyledText>
    );
};

const StyledText = styled(TextAntd)<{ fontSize?: string }>`
    word-wrap: break-word;
    color: ${(props) => props.color || "#333"};
    font-feature-settings: "clig" off, "liga" off;
    /* Font/Body 14 Regular */
    font-family: KoHo;
    font-size: ${(props) => props.fontSize || "16px"};

    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
`;
