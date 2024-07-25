import {Pagination as AntdPagination, PaginationProps as AntdPaginationProps } from 'antd';
import styled from "styled-components";

export interface PaginationProps extends AntdPaginationProps {

}

export const Pagination = (props: PaginationProps) => {

    return (
        <PaginationStyled
            {...props}
        >
        </PaginationStyled>
    )
}
const PaginationStyled = styled(AntdPagination)`
    .ant-pagination-item button{
        :hover{
            border-radius: 6px;
            background-color: ${props => props.theme.colors.primaryHover};
        }
    }
`;
