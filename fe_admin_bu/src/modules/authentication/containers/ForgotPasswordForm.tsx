import {Flex, Form} from "antd";
import {FormikContext} from "formik";
import styled from "styled-components";
import {Button} from "@/components/button/Button";
import Input from "@/components/form/Input";
import {AuthorizationSiteMap} from "../routers/AuthorizationSiteMap";
import React, {useContext} from "react";
import {Title} from "components/typhograpy/Title.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Link} from "react-router-dom";

export interface ForgotPasswordFormReq {
    email: string
}

export interface ForgotPasswordFormProps {
    // onSuccess: (data: ForgotPasswordFormReq) => void;
}

const ForgotPasswordForm = () => {
    const formik = useContext(FormikContext);
    const handleClickButton = () => {
        formik.submitForm()
    }
    return (
        <StyledForgotPasswordForm>
            <div className="forgot-password-form">
                    <Flex className="form-title" style={{
                        height: "100px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Title children={"Quên mật khẩu"} color="black" level={3}/>
                    </Flex>
                    <Input type="text" name="email" label={"Email"} isRequired={true}/>
                    <Button buttonType="primary" children={"Xác nhận"} handleClickButton={handleClickButton}/>
                    <Paragraph className="change-to-signin" children={<span>Trở lại <Link children={"Đăng nhập"}
                                                                                          to={AuthorizationSiteMap.LOGIN}/></span>}/>
            </div>
        </StyledForgotPasswordForm>
    );
}

export default ForgotPasswordForm;

const StyledForgotPasswordForm = styled(Form)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    width: 600px;
    .forgot-password-form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 25px;
        margin: 32px auto;
        padding: 30px 66px;
        background-color: #fff;
        border-radius: 16px;

        .form-title {
            width: 100%;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            left: 0;
            gap: 4px;
        }

        .change-to-signin {
            margin-top: 10px;
            align-items: flex-end;
        }

        button {
            width: 100%;
        }

        a {
            color: #344BA0;
            font-feature-settings: 'clig' off, 'liga' off;
            font-family: KoHo;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 22px;
            text-decoration-line: underline;
        }
    }


`;
