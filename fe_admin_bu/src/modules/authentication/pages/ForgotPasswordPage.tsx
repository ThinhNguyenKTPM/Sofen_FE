import {MainPage} from "public/pages/PublicPage.tsx";
import ForgotPasswordForm, {ForgotPasswordFormReq} from "authentication/containers/ForgotPasswordForm.tsx";
import {useNavigate} from "react-router-dom";
import {useRequireResetPasswordMutation} from "authentication/services/ResetPasswordService.ts";
// import {useAppSelector} from "app/store/hook.ts";
import * as yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {message} from "antd";
import {RequireResetPasswordReq, RequireResetPasswordRes} from "authentication/models/RequireResetPassword.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";
export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [requireResetPassword] = useRequireResetPasswordMutation();
    // const {account} = useAppSelector((state) => state.auth);
    //
    // useEffect(() => {
    //     if (account) {
    //         if (RoleEnum.ADMIN === account.role?.role_name) {
    //             navigate(AdminSiteMap.INDEX);
    //         } else {
    //             navigate(PublicSiteMap.INDEX);
    //         }
    //     }
    // }, [account]);

    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {email: ''} as ForgotPasswordFormReq,
        validationSchema: yup.object().shape({
            email: yup.string().trim()
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    "Email không đúng định dạng")
                .required("Vui lòng nhập email"),
        }),

        onSubmit: (values) => {
            handleOnSuccess(values);
        },
    })
    const openLoadingMessage = () => {
        message.loading({
            content: "Đang kiểm tra...",
            key: "loadingKey",
            duration: 0,
        });
    };
    // Function to close the loading message
    const closeLoadingMessage = () => {
        message.destroy("loadingKey");
    };

    const handleOnSuccess = async (value: ForgotPasswordFormReq) => {
        openLoadingMessage();
        const requireResetPasswordReq = {
            email: value.email
        } as RequireResetPasswordReq;

        const response:
            | { data: RequireResetPasswordRes }
            | { error: FetchBaseQueryError | SerializedError } = await requireResetPassword(requireResetPasswordReq);

        setTimeout(() => {
            closeLoadingMessage();
        }, 1000);

        console.log("response ", response);
        if ("data" in response) {
            message.success("Yêu cầu thành công!!");
            navigate(AuthorizationSiteMap.VALIDATE, {state: {email: value.email, isActive: false}});
        } else {
            const error: Error = response.error as Error;
            switch (error.data.error) {
                case "user.not.found":
                    formik.setFieldError("email", "Email không tồn tại");
                    break;
                default:
                    message.error(error.data.error);
            }
        }
    }
    return(
        <MainPage>
            <FormikProvider value={formik}>
                <ForgotPasswordForm/>
            </FormikProvider>
        </MainPage>
    )
}