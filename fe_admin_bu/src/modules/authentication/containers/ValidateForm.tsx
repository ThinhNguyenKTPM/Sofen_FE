import * as yup from "yup";
import {Form, Space} from "antd";
import {FormikProvider, useFormik} from "formik";
import styled from "styled-components";
import {Button} from "@/components/button/Button";
import Input from "@/components/form/Input";
import {appConfig} from "app/config/AppConfig.ts";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Title} from "components/typhograpy/Title.tsx";

export interface ValidateFormReq {
    OTPCode: string;
}

export interface ValidateFormProps {
    onSuccess: (data: ValidateFormReq) => Promise<void>;
    resend?: () => Promise<void>;
}

const ValidateForm = (props: ValidateFormProps) => {
    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {OTPCode: ""} as ValidateFormReq,
        validationSchema: yup.object().shape({
            OTPCode: yup
                .string()
                .trim()
                .max(6)
                .min(6)
                .required("Vui lòng nhập mã xác thực"),
        }),

        onSubmit: (values) => {
            props.onSuccess(values);
        },
    });
    const handleClickButton = () => {
        formik.submitForm();
    };
    return (
        <FormikProvider value={formik}>
            <StyledValidateForm>
                <div className="validate-form">
                    <Space
                        direction="vertical"
                        size="large"
                        style={{display: "flex"}}
                    >
                        <div className="form-title">
                            <Title
                                children={"Xác thực tài khoản"}
                                color="black"
                                level={3}
                            />
                            <Paragraph
                                children="Vui lòng nhập mã OTP được gửi về email của bạn, để tiếp tục."
                                fontSize="14px"
                                color="#A7ADB2"
                            />
                            <Paragraph
                                children="Thời gian tối đa 5 phút"
                                fontSize="14px"
                                color="#A7ADB2"
                            />
                        </div>
                        <Input
                            type="text"
                            name="OTPCode"
                            label={"Mã xác thực"}
                            isRequired={true}
                        />
                        <Button
                            buttonType="primary"
                            children={"Xác nhận"}
                            handleClickButton={handleClickButton}
                        />
                        <Button
                            buttonType="reverse-primary"
                            children={"Gửi lại"}
                            handleClickButton={props.resend}
                            style={{width: "50%", margin: "0px auto"}}
                            id={"reset-validate-button"}
                        />
                    </Space>
                </div>
            </StyledValidateForm>
        </FormikProvider>
    );
};

export default ValidateForm;

const StyledValidateForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    align-items: center;
    background-color: #f5f5f5;

    .validate-form {
        margin: 32px auto;
        padding: 64px 66px;
        background-color: #fff;
        border-radius: 16px;
    }

    .form-title {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    button {
        width: 100%;

        &#reset-validate-button.disabled-button-reset-password {
            color: #f3f3f3;
            background: ${appConfig.colors.semanticYellow100};
            opacity: 0.5;
            cursor: not-allowed;

            &:hover {
                color: #f3f3f3 !important;
            }
        }
    ;
    }
}

`;
