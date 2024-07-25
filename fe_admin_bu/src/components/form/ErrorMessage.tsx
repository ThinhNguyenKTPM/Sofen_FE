import styled from "styled-components";
import { getIn, useFormikContext } from "formik";

export const ErrorMessage = (props: { name: string }) => {
  const formik = useFormikContext();
  const error = formik && getIn(formik.errors, props.name);
  const touch = formik && getIn(formik.touched, props.name);

  return touch && error ? (
    <ErrorMessageStyle className={"error-message"}>{error}</ErrorMessageStyle>
  ) : null;
};

const ErrorMessageStyle = styled.span`
  position: absolute;		
  bottom: -20px;
  color: red;
  font-size: 12px;
  margin-left: 10px;
  .error-message {
    text-align: left !important;
  }
`;
