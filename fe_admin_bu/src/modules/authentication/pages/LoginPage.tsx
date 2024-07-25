import {MainPage} from "public/pages/PublicPage.tsx";
import {useNavigate} from "react-router-dom";
import LoginForm, {LoginFormReq} from "authentication/containers/LoginForm.tsx";
import {useLoginMutation} from "authentication/services/AuthSerivceApi.ts";
import {LoginReq} from "authentication/models/User.ts";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";
import {message} from "antd";
import useLoadUserProfileHook from "authentication/hook/useLoadUserProfileHook.tsx";
import {useAppSelector} from "app/store/hook.ts";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";
import {useEffect} from "react";
import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {AdminSiteMap} from "@/modules/admin/routers/AdminSiteMap.ts";

export const LoginPage = () => {
    const navigate = useNavigate();
    // const location = useLocation();

    const {loadUserProfile} = useLoadUserProfileHook();
    const [login] = useLoginMutation();
    const {ready, account} = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (account) {
            navigate(PublicSiteMap.INDEX);
        }
    }, [account]);
    const handleOnSubmit = async (formData: LoginFormReq) => {
        const request: LoginReq = {
            username: formData.email,
            password: formData.password,
        };

        login(request)
            .unwrap()
            .then((res) => {
                localStorage.setItem("AccessToken", res.access_token);
                localStorage.setItem("RefreshToken", res.refresh_token);
                loadUserProfile();
                navigate(AdminSiteMap.INDEX);
            })
            .catch((error) => {
                if (error.status === 401) {
                    message.error(
                        "Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại"
                    );
                } else if (error.data && error.data.error === "user.inactive") {
                    navigate(AuthorizationSiteMap.VALIDATE, {
                        state: {email: request.username, isActive: true},
                    });
                } else if (error.data && error.data.error === "user.deactive") {
                    message.error("Tài khoản của bạn đang bị khóa. Vui lòng liên hệ Hotline để biết thêm thông tin.");
                } else {
                    message.error("Lỗi hệ thống");
                }
            });
    };

    return (
        <MainPage>
            <LoginForm onSubmit={handleOnSubmit}/>
        </MainPage>
    )
}