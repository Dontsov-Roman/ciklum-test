import i18n from "i18next";

import { reactI18nextModule } from "react-i18next";
import en from "./en";

const resources = {};

i18n.use(reactI18nextModule).init({
    resources: {
        en: { translation: en }
    },
    lng: "en",
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
});
export default i18n;