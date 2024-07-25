import styled from "styled-components";
import {Flex, message} from "antd";
import {Title} from "components/typhograpy/Title.tsx";
import {StyledInputGroup} from "authentication/containers/profile/UserInfor.tsx";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {Text} from "components/typhograpy/Text.tsx";
import {Button} from "components/button/Button.tsx";
import Input from "components/form/Input.tsx";
import {useChangePasswordMutation} from "authentication/services/ResetPasswordService.ts";
import {ChangePasswordReq} from "authentication/models/RequireResetPassword.ts";
import {User} from "authentication/models/User.ts";
import {useSelector} from "react-redux";
import {RootState} from "app/store/store.ts";

export const PasswordSetting = () => {
    const userInfo: User | null = useSelector(
        (state: RootState) => state.auth.account ?? null
    );
    const [changePassword] = useChangePasswordMutation();
    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            oldPassword: "",
            newPassword: "",
            passwordConfirm: ""
        },
        validationSchema: Yup.object().shape({
            newPassword: Yup.string().trim()
                .min(8, "Mật khẩu tối thiểu 8 ký tự")
                .required("Vui lòng nhập mật khẩu mới"),
            passwordConfirm: Yup.string().trim()
                .oneOf([Yup.ref('newPassword')], "Xác nhận mật khẩu không chính xác")
                .required("Vui lòng xác nhận mật khẩu")
        }),
        onSubmit: (values) => {

        }
    })

    const handleReset = () => {
        formik.resetForm();
    }
    const handleUpdate = () => {
        formik.handleSubmit();
        formik.validateForm();

        const changePasswordReq = {
            email: userInfo?.email,
            password: formik.values.oldPassword,
            newPassword: formik.values.newPassword
        } as ChangePasswordReq;
        message.loading("Đang thay đổi mật khẩu");
        changePassword(changePasswordReq).unwrap()
            .then((res) => {
                message.success("Đổi mật khẩu thành công");
            })
            .catch(((error) => {
                switch (error.data.error) {
                    case "password.not.match":
                        formik.setFieldError("oldPassword", "Mật khẩu cũ không chính xác");
                        break;
                }
            }));
        formik.resetForm();
        // dispath(setCredentials(formik.values));
    }
    return (
        <StyledPasswordSetting vertical={true} gap={12}>
            <Title level={4}>
                Setting Password
            </Title>
            <FormikProvider value={formik}>
                <Flex vertical={true}>
                    <StyledInputGroup>
                        <Text fontSize="16px" fontWeight={700}>
                            Old Password
                        </Text>
                        <Input name="oldPassword" type={"password"}/>
                    </StyledInputGroup>
                    <StyledInputGroup>
                        <Text fontSize="16px" fontWeight={700}>
                            New Password
                        </Text>
                        <Input name="newPassword" type={"password"}/>
                    </StyledInputGroup>
                    <StyledInputGroup>
                        <Text fontSize="16px" fontWeight={700}>
                            Confirm Password
                        </Text>
                        <Input name="passwordConfirm" type={"password"}/>
                    </StyledInputGroup>
                </Flex>
                <Flex gap={20} style={{
                    marginLeft: "auto"
                }}>
                    <Button
                        buttonType={"reverse-primary"} handleClickButton={handleReset}>
                        Reset
                    </Button>
                    <Button
                        type="primary" handleClickButton={handleUpdate}>
                        Save
                    </Button>

                </Flex>

            </FormikProvider>

        </StyledPasswordSetting>
    )
}
const StyledPasswordSetting = styled(Flex)`
    width: 100%;
    padding: 20px 30px;
`;
