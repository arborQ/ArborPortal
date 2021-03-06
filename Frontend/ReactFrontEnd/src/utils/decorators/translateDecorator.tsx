import * as i18next from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
type Languages = 'en' | 'pl';
type Namespaces = 'shared' | 'account' | 'users';

export function translate(namespace: Namespaces, key: string): string {
    return i18next.t(key);
}

export interface ITranslationsProps {
    translate: (key: string) => string;
    currentLanguage: string;
    changeLanguage: (newLanguage: 'en' | 'pl') => void;
}

export function ensureTranslationsDecorator<P extends ITranslationsProps>(
    { namespace, loadTranslations }: { namespace: string; loadTranslations?: () => Promise<any>; }): any {
    return (Component: React.ComponentClass<P>): any => {
        return (props: P): JSX.Element => {
            const { t, i18n } = useTranslation();

            return <Component
                {...props}
                translate={t}
                currentLanguage={i18n.language}
                changeLanguage={
                    (ln: Languages) => i18next.changeLanguage(i18n.language === 'en' ? 'pl' : 'en')
                } />;
        };
    };
}
