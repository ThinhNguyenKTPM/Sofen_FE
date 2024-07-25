import {createGlobalStyle} from "styled-components";
import {themeVariables} from "app/config/ThemeVariables.ts";

export default createGlobalStyle`
    :root {
        ${themeVariables}
    }
`;