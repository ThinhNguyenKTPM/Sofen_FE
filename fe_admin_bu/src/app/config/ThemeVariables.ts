import {css} from "styled-components";
import {appConfig} from "app/config/AppConfig.ts";

export const themeVariables = () => css`
    --primary-color: ${appConfig.colors.primary};
`;