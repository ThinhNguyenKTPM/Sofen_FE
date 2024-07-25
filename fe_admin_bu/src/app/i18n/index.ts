import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import English from "./language/en.json";
import Vietnamese from "./language/vi.json";

const resources = {
    en: {
        translation: English,
    },
    vi: {
        translation: Vietnamese,
    },
};

const lang = localStorage.getItem("lang") ?? "vi";

i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;