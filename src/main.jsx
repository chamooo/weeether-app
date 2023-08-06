import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './translations/en.json';
import ukTranslation from './translations/uk.json';
i18n.use(LanguageDetector).init({
    resources: {
        en: { translation: enTranslation },
        uk: { translation: ukTranslation },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false, // React already escapes values
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <I18nextProvider i18n={i18n}>
        <App />
    </I18nextProvider>,
);
