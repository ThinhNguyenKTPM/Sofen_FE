import { Button } from "@/components/button/Button";
import Input from "@/components/form/Input";
import { FormikContextType, FormikProvider } from "formik";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthorizationSiteMap } from "../routers/AuthorizationSiteMap";
import { DateInput } from "components/form/DateInput.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Title} from "components/typhograpy/Title.tsx";

export interface SignUpFormReq {
    fullName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    password: string;
    passwordConfirm: string;
}

export interface SignUpFormProps {
    onSuccess: (data: SignUpFormReq) => void;
    formik: FormikContextType<SignUpFormReq>;
}

const SignUpForm = (props: SignUpFormProps) => {
    const handleClickButton = () => {
        props.formik.submitForm();
    };
    return (
        <StyledSignUpPage>
            <StyledSignUpContainer>
                <FormikProvider value={props.formik}>
                    <div className="signup-form">
                        <div className="form-title">
                            <div className="form-title-left">
                                <Title
                                    color="black"
                                    children="Tạo tài khoản mới"
                                    level={3}
                                />
                                <Paragraph
                                    children="Tham gia và tận hưởng trải nghiệm mua sắm trực tuyến tốt nhất"
                                    fontSize="14px"
                                    color="#A7ADB2"
                                />
                            </div>
                            <div className="form-title-right">
                                <Paragraph
                                    className="change-to-signin"
                                    children={
                                        <span>
                                            Bạn đã có tài khoản{" "}
                                            <Link
                                                children={"Đăng nhập ngay"}
                                                to={AuthorizationSiteMap.LOGIN}
                                            />{" "}
                                        </span>
                                    }
                                />
                            </div>
                        </div>
                        <div className="signup-form-content">
                            <div className="signup-form-left">
                                <div className="form-input">
                                    <Input
                                        type="text"
                                        name="fullName"
                                        label={"Họ tên"}
                                        isRequired={true}
                                    />
                                    <Input
                                        type="text"
                                        name="phoneNumber"
                                        label={"Số điện thoại"}
                                        isRequired={true}
                                    />
                                    <Input
                                        type="text"
                                        name="email"
                                        label={"Email"}
                                        isRequired={true}
                                    />
                                    <DateInput
                                        name={"birthDate"}
                                        label={"Ngày sinh (dd/mm/yyyy)"}
                                        isRequired={true}
                                        format={"DD/MM/YYYY"}
                                    />
                                </div>
                            </div>
                            <div className="signup-form-right">
                                <div className="form-input">
                                    <Input
                                        type="password"
                                        name="password"
                                        label={"Mật khẩu"}
                                        isRequired={true}
                                    />
                                    <Input
                                        type="password"
                                        name="passwordConfirm"
                                        label={"Xác nhận mật khẩu"}
                                        isRequired={true}
                                    />
                                </div>
                                <div className="form-submit">
                                    <Button
                                        buttonType="primary"
                                        children={"Đăng ký"}
                                        handleClickButton={handleClickButton}
                                    />
                                    <Paragraph
                                        children="Bằng cách ấn vào nút “ĐĂNG KÝ”, tôi đồng ý với Điều Khoản Sử Dụng và Chính Sách Bảo Mật của The Sofen Hotel"
                                        fontSize="14px"
                                        color="#A7ADB2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </FormikProvider>
            </StyledSignUpContainer>
        </StyledSignUpPage>
    );
};

export default SignUpForm;

const StyledSignUpPage = styled.div`
    padding: 2% 12.5%;
    background-color: #f5f5f5;
`;
const StyledSignUpContainer = styled.div`
    background-color: #fff;
    border-radius: 16px;

    .signup-form {
        padding: 40px 115px;

        .form-title {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10vw;

            .form-title-left {
                width: 100%;
                justify-content: center;
            }

            .form-title-right {
                width: 100%;
                justify-content: center;
                margin-top: 28px;

                .change-to-signin {
                    text-align: right;
                }

                a {
                    color: #344ba0;
                    font-feature-settings: "clig" off, "liga" off;
                    font-family: KoHo;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 22px;
                    text-decoration-line: underline;
                }
            }
        }

        .signup-form-content {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 8vw;
            margin-top: 40px;

            .signup-form-left {
                width: 100%;
            }

            .signup-form-right {
                width: 100%;

                button {
                    width: 100%;
                }
            }

            .form-input {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .form-submit {
                margin-top: 40px;

                button {
                    margin-bottom: 20px;
                }
            }
        }

        @media (max-width: 992px) {
            .form-title,
            .signup-form-content {
                flex-direction: column;
                gap: 20px;
                width: 100%;
            }
        }
    }
`;
