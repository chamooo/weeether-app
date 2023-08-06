import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (event) => {
        i18n.changeLanguage(event.target.getAttribute('data-lang'));
    };

    const languages = [
        { value: 'en', label: 'EN' },
        { value: 'uk', label: 'UA' },
    ];

    return (
        <div className={s.langSwitcher}>
            {languages.map((lang, i) => {
                return (
                    <button key={i} onClick={handleChangeLanguage} data-lang={lang.value}>
                        {lang.label}
                    </button>
                );
            })}
        </div>
    );
};

export default LanguageSwitcher;
