import styled from "styled-components";
import {Button as AntdButton, ButtonProps as AntdButtonDrops} from "antd";
import React from "react";

export interface ButtonProps extends AntdButtonDrops {
    children?: React.ReactNode;
    buttonType?: "primary" | "secondary" | "reverse-primary";
    handleClickButton?: () => void;
}

export const Button = (
    {
        children,
        buttonType,
        handleClickButton,
        ...props
    }: ButtonProps) => {

    return (
        <StyledButton className={buttonType} {...props} onClick={handleClickButton}>
            {children}
        </StyledButton>
    )

};
const StyledButton = styled(AntdButton)`
    width: unset;
    height: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    border-radius: 12px;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: 2px solid transparent;
    padding: 0.5rem 1rem;
    transition: all 0.5s ease-in-out;
    font-size: 1rem;

    &.reverse-primary.ant-btn-default:not(:disabled):not(.ant-btn-disabled){
        border: 1px solid;
        color: ${props => props.theme.colors.primary};
        border-color: ${props => props.theme.colors.primary};
        background-color: white;
    }
    &.primary.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
        color: white;
        border: 1px solid;
        background-color: ${props => props.theme.colors.primary};
        border-color: ${props => props.theme.colors.primary};
    }
    
        
`;
