import config from "app/config/AppEnvironment.ts";
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";


export const baseQuery = fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    prepareHeaders: (headers) => {
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("content-type", "application/json");
        const token = localStorage.getItem("AccessToken");
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        const lang = localStorage.getItem("lang");
        console.log("base query ", lang);
        if (lang) {
            headers.set("Accept-Language", lang);
        }
        return headers;
    },
});

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
    = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshArgs = {
            url: "/auth/refresh-token",
            method: "POST",
            body: {refreshToken: localStorage.getItem("RefreshToken")}
        };

        const { data } = await baseQuery(refreshArgs, api, extraOptions) as unknown as any;

        if (data) {
            const response = await baseQuery(args, api, extraOptions);

            localStorage.setItem("AccessToken", data.access_token);
            localStorage.setItem("RefreshToken", data.refresh_token);

            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);

            return response;
        } else {
            localStorage.removeItem("AccessToken");
            localStorage.removeItem("RefreshToken");
            // redirectURL(AuthorizationSiteMap.LOGIN);
            return result;
        }
    } else {
        return result;
    }
};

export const redirectURL = (url: string, type?: "" | "blank") => {
    if (type === "blank") return window.open(url, "_blank");
    return window.location.replace(url);
};