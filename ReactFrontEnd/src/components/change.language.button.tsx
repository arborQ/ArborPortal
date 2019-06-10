import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

interface IChangeLanguageProps {
    name: string;
}


export default function(props: IChangeLanguageProps): JSX.Element {
    const { t, i18n } = useTranslation();
    return (
            <div>
                <Button
                    onClick={() => {
                        i18n.changeLanguage(i18n.language !== 'pl'? 'pl': 'en')
                    }}
                >
                    {t("Change language")}
                </Button>
            </div>
        );
}
