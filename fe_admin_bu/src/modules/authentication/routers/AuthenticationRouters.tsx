import {RouteObject} from "react-router-dom";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";
import {LoginPage} from "authentication/pages/LoginPage.tsx";
import {ForgotPasswordPage} from "authentication/pages/ForgotPasswordPage.tsx";
import ValidatePage from "authentication/pages/ValidatePage.tsx";
import {SignupPage} from "authentication/pages/SignupPage.tsx";
import {ResetPasswordPage} from "authentication/pages/ResetPasswordPage.tsx";
import {ProfilePage} from "authentication/pages/ProfilePage.tsx";

export const AUTHENTICATION_ROUTER: RouteObject[] = [
    {path: AuthorizationSiteMap.LOGIN, element: <LoginPage/>},
    {path: AuthorizationSiteMap.FORGOT_PASSWORD, element: <ForgotPasswordPage/>},
    {path: AuthorizationSiteMap.VALIDATE, element: <ValidatePage/>},
    {path: AuthorizationSiteMap.SIGNUP, element: <SignupPage/>},
    {path: AuthorizationSiteMap.RESET_PASSWORD, element: <ResetPasswordPage/>},
    {path: AuthorizationSiteMap.PROFILE, element: <ProfilePage/> }
]