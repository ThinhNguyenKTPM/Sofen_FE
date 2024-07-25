import {Button} from "@/components/button/Button";
import Input from "@/components/form/Input";
import {Flex, Form, Space} from "antd";
import {FormikProvider, useFormik} from "formik";
import styled from "styled-components";
import * as yup from "yup";
import {AuthorizationSiteMap} from "../routers/AuthorizationSiteMap";
import {Link} from "react-router-dom";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Title} from "components/typhograpy/Title.tsx";
import {Carousels} from "authentication/components/Carousel.tsx";
import React from "react";

export interface LoginFormReq {
    email: string,
    password: string
}

export interface LoginFormProps {
    onSubmit: (data: LoginFormReq) => void;
}

const LoginForm = (props: LoginFormProps) => {
    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            email: '',
            password: ''
        } as LoginFormReq,
        validationSchema: yup.object().shape({
            email: yup.string()
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    "Email không đúng định dạng")
                .required("Vui lòng nhập email"),
            password: yup.string().min(8, "Mật khẩu có ít nhất 8 ký tự").required("Vui lòng nhập mật khẩu")
        }),
        onSubmit: (values) => {
            props.onSubmit(values);
        },
    })
    const handleClickButton = () => {
        formik.submitForm()
    }
    return (
        <StyledLoginPage>
            <StyledLoginPageContainer>
                <FormikProvider value={formik}>
                    <StyledLoginForm>
                        <div className="login-form">
                            <Flex className="form-title" style={{
                                height: "100px",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Title color="black" children="The Sofen Hotel Admin" level={3}/>
                            </Flex>
                            <Space direction="vertical" size="large" style={{display: "flex"}}>
                                <Input type="text" name="email" label={"Email"} isRequired={true}/>
                                <Input type="password" name="password" label={"Mật khẩu"} isRequired={true}
                                       onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                           if (event.key === "Enter") {
                                               formik.submitForm();
                                           }
                                       }}
                                />
                            </Space>

                            <div className="forgot-password">
                                <Link children={"Quên mật khẩu"} to={AuthorizationSiteMap.FORGOT_PASSWORD}/>
                            </div>
                            <Button buttonType="primary" children={"Đăng nhập"}
                                    handleClickButton={handleClickButton}/>
                        </div>

                    </StyledLoginForm>
                </FormikProvider>
            </StyledLoginPageContainer>
        </StyledLoginPage>
    );
}

export default LoginForm;
const StyledLoginPage = styled.div`
    background-color: #f5f5f5;
`
const StyledLoginPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    padding: 72px 0;
    border-radius: 16px;
    justify-content: center;
    gap: 5vw;

    .login-page-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25vw;
        height: 250px;
    }

    @media (max-width: 992px) {
        & {
            flex-direction: column;
            gap: 50px;
            .login-page-image {
                display: none;

                img {
                    width: 50vw;
                    //height: 40vw;
                }
            }

        }
    }
`
const StyledLoginForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 600px;

    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 16px;
        width: 100%;

        .form-title {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;

            h3 {
                margin: 0px;
                color: #22313F;
                font-feature-settings: 'clig' off, 'liga' off;
                /* Font/Title 24 Bold */
                font-family: JambonoVN Black;
                font-size: 24px;
                font-style: normal;
                font-weight: 400;
                line-height: 36px; /* 150% */
            }

            p {
                color: #A7ADB2;
                font-feature-settings: 'clig' off, 'liga' off;
                /* Font/Body 14 Regular */
                font-family: KoHo;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 14px; /* 157.143% */
            }
        }

        .forgot-password {
            text-align: right;
            color: #344BA0;
            margin-bottom: 25px;
        }

        .change-to-signup {
            margin-top: 25px;
            text-align: center;
        }

        a {
            color: #344BA0;
            font-feature-settings: 'clig' off, 'liga' off;
            /* Font/Body 14 Semi Bold Underline */
            font-family: KoHo;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 22px; /* 157.143% */
            text-decoration-line: underline;
        }

        input {
            width: 100%;
        }
    }

    @media (max-width: 992px) {
        width: 70%;
    }
`;