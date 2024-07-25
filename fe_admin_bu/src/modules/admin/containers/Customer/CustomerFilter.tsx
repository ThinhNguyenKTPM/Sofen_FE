import {useState} from "react";
import {FormikProvider, useFormik} from "formik";
import {SearchFormReq} from "@/modules/admin/model/UserManagement.ts";
import styled from "styled-components";
import Input from "components/form/Input.tsx";
import {Button} from "components/button/Button.tsx";
import {ReloadOutlined} from "@ant-design/icons";
import {Select} from "antd";

export const editStatus = [
    {
        value: "TẤT CẢ",
        label: "TẤT CẢ",
    },
    {
        value: "INACTIVE",
        label: "INACTIVE",
    },
    {
        value: "ACTIVE",
        label: "ACTIVE",
    },
    {
        value: "DEACTIVATED",
        label: "DEACTIVATED",
    },
];

export interface CustomerFilterProps {
    onSuccess: (data: SearchFormReq) => void;
    onSelectChange: (value: string) => void;
    onReset?: () => void;
}

export const CustomerFilter = (
    {
        onSuccess,
        onSelectChange,
        onReset,
    }: CustomerFilterProps
) => {

    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            searchInput: "",
        } as SearchFormReq,
        onSubmit: (values) => {
            onSuccess(values);
        },
    });
    const [status, setStatus] = useState(editStatus[0].value);

    const handleReset = () => {
        setStatus(editStatus[0].value);
        formik.resetForm();
        onReset && onReset();
    };

    const handleSelectChange = (value: string) => {
        setStatus(value);
        onSelectChange && onSelectChange(value);
    };
    return (
        <StyledCustomerFilter>
            <FormikProvider value={formik}>
                <StyledSearchForm>
                    <label htmlFor="searchInput">Tìm kiếm:</label>
                    <Input
                        label=""
                        name="searchInput"
                        type="text"
                        placeholder="Tìm tài khoản..."
                        style={{
                            fontSize: "unset",
                            height: "unset",
                        }}
                        onKeyDown={(
                            event: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                            if (event.key === "Enter") {
                                formik.submitForm();
                            }
                        }}
                    />
                </StyledSearchForm>
                <StyledStatusSelect>
                    <span>Trạng thái: </span>
                    <Select
                        value={status}
                        options={editStatus}
                        style={{width: 180}}
                        onChange={handleSelectChange}
                    />
                </StyledStatusSelect>
                <StyledResetButton>
                    <Button
                        onClick={handleReset}
                    >
                            <span>Làm mới</span>
                            <ReloadOutlined/>

                    </Button>
                </StyledResetButton>
            </FormikProvider>
        </StyledCustomerFilter>
    )
}
const StyledCustomerFilter = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 10px 10px;
    margin-bottom: 10px;
    background-color: white;
    justify-content: space-between;
    border-radius: 16px;
    box-sizing: border-box;
    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const StyledSearchForm = styled.div`
    display: flex;
    align-items: center;
    width: 500px;

    label {
        color: black;
        font-weight: 500;
        width: 100px;
    }
`;

const StyledStatusSelect = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-right: 10px;
    }
`;
export const StyledResetButton = styled.div`
    button {
        width: 150px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        background-color: #5270d0;
        color: white;
        border-radius: 12px;
        span {
            margin-right: 5px;
        }

        &:hover {
            background-color: #5270d0;
        }
    }

    .ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
        color: #5270d0;
        border-color: #5270d0;
        background: #ffffff;
        font-size: 18px;
        font-weight: 600;
    }
`;
