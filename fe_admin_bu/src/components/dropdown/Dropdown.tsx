import { ReactNode } from "react";
import { DropDownProps, Dropdown as AntdDropdown, MenuProps } from "antd";
import { DropdownProps } from "antd";
import styled from "styled-components";


interface Props extends DropdownProps {
  className?: string;
  children: ReactNode;
  placement: DropDownProps["placement"];
  items: MenuProps["items"];
}

const Dropdown = ({
  children,
  className,
  placement,
  items,
  ...props
}: Props) => {
  return (
    <StyledDropdown
      menu={{ items }}
      placement={placement}
      className={className}
      {...props}
    >
      {children}
    </StyledDropdown>
  );
};

export default Dropdown;

const StyledDropdown = styled(AntdDropdown)`
  font-family: KoHo;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
