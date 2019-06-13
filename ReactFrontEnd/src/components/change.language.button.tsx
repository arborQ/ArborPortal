import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { localeStore  } from '@bx-utils/storage'

interface IChangeLanguageProps {
    name: string;
}

export default function(props: IChangeLanguageProps): JSX.Element {
    const { t, i18n } = useTranslation();

    return (
            <div>
                <Button
                    onClick={() => {
                        const newLanguage = i18n.language !== 'pl' ? 'pl' : 'en';
                        localeStore.update({language: newLanguage});
                        i18n.changeLanguage(newLanguage)
                    }}
                >
                    {t('Change language')}
                </Button>
            </div>
        );
}
