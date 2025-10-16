import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n as default }; // eslint-disable-line unicorn/prefer-export-from
