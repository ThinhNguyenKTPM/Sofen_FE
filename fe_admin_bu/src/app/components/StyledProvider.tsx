import {Alert, ConfigProvider} from "antd";
import {ReactNode} from "react";
import {ThemeProvider, useTheme as useThemStyled} from "styled-components";
import {appConfig} from "../config/AppConfig.ts";

const {ErrorBoundary} = Alert;

export const StyledProvider = (props: { children: ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                hashed: false,
                token: {
                    fontFamily: appConfig.fontFamily,
                    fontSize: appConfig.fontSize,
                    colorPrimary: appConfig.colors.primary,
                    colorSuccess: appConfig.colors.success,
                    colorWarning: appConfig.colors.warning,
                    colorError: appConfig.colors.danger,
                    colorInfo: appConfig.colors.info,
                },
                components: {
                    Select: {
                        optionSelectedBg: appConfig.colors.primary,
                        optionSelectedColor: appConfig.colors.white,
                    },
                    Table: {
                        rowHoverBg: "#F5F5F5",
                        headerBg: "#5270d0",
                        borderColor: "#5270d0",
                        headerColor: "#f1f5f9",
                    },
                    Pagination: {
                        itemSize: 40,
                        fontFamily: appConfig.fontFamily,
                    },
                },
            }}
        >
            <ErrorBoundary>
                <ThemeProvider theme={appConfig}>
                    {props.children}
                </ThemeProvider>
            </ErrorBoundary>
        </ConfigProvider>
    );
};

export const useTheme = (): Record<string, any> => {
    return useThemStyled();
};
