
import {useAppDispatch, useAppSelector} from "app/store/hook.ts";
import { onError, onReady } from "app/store/slice/authSlice.tsx";
import { useNavigate } from "react-router-dom";
import { AuthorizationSiteMap } from "../routers/AuthorizationSiteMap";
import accountServiceApi from "authentication/services/AccountService.ts";

const useLoadUserProfileHook = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [getAccount] = accountServiceApi.endpoints.getAccount.useLazyQuery();
    const token = localStorage.getItem("AccessToken");
    const loadUserProfile = () => {
        getAccount({})
            .unwrap()
            .then((res) => {
                if (res.status === "DEACTIVATED") {
                    if (token) {
                        localStorage.removeItem("AccessToken");
                        localStorage.removeItem("RefreshToken");
                    }
                    navigate(AuthorizationSiteMap.LOGIN);
                } else {
                    dispatch(onReady(res));
                }

                // dispatch(onReady(res));
            })
            .catch(() => {
                dispatch(onError());
            });
    };

    return {
        loadUserProfile,
    };
};

export default useLoadUserProfileHook;
