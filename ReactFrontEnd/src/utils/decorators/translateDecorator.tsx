import i18next from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as React from 'react';
import StateComponent from '../stateComponent';

type Languages = 'en' | 'pl';
type Namespaces = 'shared' | 'account' | 'users';

export function translate(namespace: Namespaces, key: string): string {
    return i18next.t(key);
}

export async function changeLanguage(language: Languages): Promise<void> {

}

export function ensureTranslationsDecorator<P extends WithTranslation>() {
    return (Component: React.ComponentType<P>) => {
        return class TranslateDecoratorClass extends StateComponent<P, { }> {
            public render(): JSX.Element {
                const ComponentWithTranslations = withTranslation()(Component);

                return <ComponentWithTranslations {...this.props} />;
            }
        };
    };
}
