import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import accountEn from '@bx-translations/account/pl'
import accountPl from '@bx-translations/account/en'
import sharedEn from '@bx-translations/shared/pl'
import sharedPl from '@bx-translations/shared/en'

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      ...sharedEn, ...accountEn
    }
  },
  pl: {
    translation: {
      ...sharedPl, ...accountPl
    }
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "pl",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;

  export async function loadNamespace(namespace: string, loadTranslations: () => Promise<any>) : Promise<void> {
    const loadedTranslation = await loadTranslations();

    i18n.addResourceBundle(i18n.language, namespace, loadedTranslation);
  }