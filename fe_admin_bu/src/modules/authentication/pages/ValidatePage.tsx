import {useLocation, useNavigate} from "react-router-dom";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";
import {message} from "antd";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {SerializedError} from "@reduxjs/toolkit";
import {useEffect, useRef} from "react";
import {
    CheckOPTReq,
    RequireResetPasswordReq,
    RequireResetPasswordRes
} from "authentication/models/RequireResetPassword.ts";
import {useCheckOTPMutation, useRequireResetPasswordMutation} from "authentication/services/ResetPasswordService.ts";
import {MainPage} from "public/pages/PublicPage.tsx";
import ValidateForm, {ValidateFormReq} from "authentication/containers/ValidateForm.tsx";
import CooldownTimer from "authentication/components/CoolDown.tsx";

export default function ValidatePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const timeoutRef = useRef<NodeJS.Timeout>();

    const {email} = location.state ? location.state as { email: string, isActive: boolean } : {email: ""};
    // useEffect(() => {
    //     if(email === ""){
    //         navigate(PublicSiteMap.NOT_FOUND);
    //     }
    // }, [email, navigate]);

    const [checkOTP] = useCheckOTPMutation();
    const [requireResetPassword] = useRequireResetPasswordMutation();


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

    const handleOnSuccess = async (value: ValidateFormReq) => {
        openLoadingMessage();
        const checkOTPReq = {
            otp: value.OTPCode,
            email: email
        } as CheckOPTReq;
        const response:
            | { data: RequireResetPasswordRes }
            | { error: FetchBaseQueryError | SerializedError } = await checkOTP(checkOTPReq);
        closeLoadingMessage();
        if ("data" in response) {
            message.success("Yêu cầu thành công!!");
            setTimeout(() => {
                if (location.state.isActive) {
                    navigate(AuthorizationSiteMap.LOGIN);
                } else {
                    navigate(AuthorizationSiteMap.RESET_PASSWORD, {state: {email: email}});
                }
            }, 1000);
        } else {
            const error: Error = response.error as Error;
            setTimeout(() => {
                message.error(error.message);
            }, 1500);
        }

    }

    useEffect(() => {
        const button = document.getElementById("reset-validate-button");
        if (button) {
            button.addEventListener("click", () => {
                button.classList.add("disabled-button-reset-password");
                button.setAttribute("disabled", "true");
                timeoutRef.current = setTimeout(() => {
                    button.removeAttribute("disabled");
                    button.classList.remove("disabled-button-reset-password");
                }, 120000);
            });
        }
    })

    const handleResend = async () => {
        openLoadingMessage();
        const requireResetPasswordReq = {
            email: email
        } as RequireResetPasswordReq;

        const response:
            | { data: RequireResetPasswordRes }
            | { error: FetchBaseQueryError | SerializedError } = await requireResetPassword(requireResetPasswordReq);
        closeLoadingMessage();
        console.log("response ", response);
        if ("data" in response) {
            setTimeout(() => {
                message.success("Yêu cầu thành công!!");
            }, 1000);
        } else {
            const error: Error = response.error as Error;
            setTimeout(() => {
                message.error(error.data.error_message);
            }, 1500);
        }
    }
    return (
        <MainPage>
            <CooldownTimer initialTime={60} cooldownDuration={60} onCooldownEnd={() => console.log('Cooldown ended')} />
            <ValidateForm onSuccess={handleOnSuccess} resend={handleResend}/>
        </MainPage>
    )
}