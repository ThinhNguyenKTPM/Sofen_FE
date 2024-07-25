import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthorizationSiteMap} from "@/modules/authentication/routers/AuthorizationSiteMap";
import {ReactNode, useEffect} from "react";
import useLoadUserProfileHook from "authentication/hook/useLoadUserProfileHook.tsx";
import {useAppSelector} from "app/store/hook.ts";

export enum RoleEnum {
    USER = 'ROLE_USER',
    ADMIN = 'ROLE_ADMIN',
}
interface AuthProps {
    allowedRole?: RoleEnum[];
    children: ReactNode,
}

const RequireAuth = ({allowedRole, children}: AuthProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {loadUserProfile} = useLoadUserProfileHook();

    const {ready, account} = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (localStorage.getItem("AccessToken")) {
            if (!ready) {
                loadUserProfile();
            }
        } else {
            navigate(AuthorizationSiteMap.LOGIN);
        }
    }, [ready, account]);

    if (ready) {
        if (!allowedRole || (account && account && allowedRole.includes(account.role.role))) {
            return <>{children}</>
        } else {
            return <Navigate to={AuthorizationSiteMap.LOGIN} state={{from: location}} replace/>;
        }
    } else {
        return null;
    }
};

export default RequireAuth;
