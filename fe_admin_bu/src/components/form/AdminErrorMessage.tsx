import styled from "styled-components";
import { getIn, useFormikContext } from "formik";

export const AdminErrorMessage = (props: { name: string }) => {
    const formik = useFormikContext();
    const error = formik && getIn(formik.errors, props.name);
    const touch = formik && getIn(formik.touched, props.name);

    return touch && error ? (
        <AdminErrorMessageStyle className={"error-message"}>
            {error}
        </AdminErrorMessageStyle>
    ) : null;
};

const AdminErrorMessageStyle = styled.span`
    bottom: -20px;
    color: red;
    font-size: 12px;
    margin-left: 10px;
`;
