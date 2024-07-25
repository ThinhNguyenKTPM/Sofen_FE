import { ReactNode } from "react";
import styled from "styled-components";
export const InputGroup = (props: {
  isDisplay: boolean
  isRequired?: boolean;
  label?: ReactNode;
  children: ReactNode;
  width?: string
}) => {
  return (
      <InputGroupStyle $width={props.width || "100%"}>
        {(props.label && props.isDisplay) && (
            <label>
              {props.label}
              {props.isRequired && <span className="require">*</span>}
            </label>
        )}
        <div className="input-item">{props.children}</div>
      </InputGroupStyle>
  );
};
const InputGroupStyle = styled.div<{ $width: string }>`
    position: relative;
    text-align: center;
    justify-content: flex-start;
    border-radius: 10px;
    background-color: #f5f5f5;
    width: ${(props) => props.$width};
    transition: background-color 1s ease-in;
    font-family: KoHo;

    & label {
        z-index: 1;
        position: absolute;
        display: flex;
        text-align: center;
        color: black;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        top: 50%;
        left: 0;
        transform: translate(15px, -50%);
    }

    .input-item {
        display: flex;
        flex-direction: column;
        z-index: 2;
        position: relative;
    }

    .require {
        color: red;
    }

    .toggle-type-password {
        position: absolute;
        right: 10px;
        top: 20px;

        svg {
            width: 20px;
            height: 20px;
        }
    }

    &:hover,
    * &:hover {
        cursor: pointer;
    }

    &:focus-within {
        box-shadow: 0 0 0 5px rgba(245, 245, 245, 0.6);
    }
`;
