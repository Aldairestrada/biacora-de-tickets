import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';
import en from './en.json';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en }
  },
  lng: localStorage.getItem('lang') || 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false }
});

export default i18n;
