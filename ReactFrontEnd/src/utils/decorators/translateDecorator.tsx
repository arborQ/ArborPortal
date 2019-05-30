import i18next from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
type Languages = 'en' | 'pl';
type Namespaces = 'shared' | 'account' | 'users';

export function translate(namespace: Namespaces, key: string): string {
    return i18next.t(key);
}

export async function changeLanguage(language: Languages): Promise<void> {

}

export interface ITranslationsProps {
    translate: (key: string) => string;
    currentLanguage: string;
    changeLanguage: (newLanguage: 'en' | 'pl') => void;
}

export function ensureTranslationsDecorator<P extends ITranslationsProps, S = any>(namespace: string, loadTranslations?: () => Promise<any>) {
    return (Component: React.ComponentType<P>): Utils.Types.PassThruReactComponentType<P, ITranslationsProps> => {
        return function (props: P): JSX.Element {
            const { t, i18n } = useTranslation();
            
            return <Component {...props} translate={t} currentLanguage={i18n.language} changeLanguage={(ln: Languages) => i18next.changeLanguage(i18n.language === 'en' ? 'pl': 'en')}  />;
        }
    };
}
