import * as React from 'react';
import { useTranslation } from 'react-i18next';
import AuthorizeContext from '@bx-contexts/authorize.context';
import { useSnackbar } from 'notistack';
import AsyncButton from '@bx-components/async.button.component';

interface ILoginButtonProps {
    text?: string;
    onAuthorized: () => void;
}

export default function (props: ILoginButtonProps): JSX.Element {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <AuthorizeContext.Consumer>
            {
                value => (
                    value.isAuthorized
                        ? null
                        : <AsyncButton
                            onClick={async () => {
                                const { login } = await import('@bx-services/account');
                                await login();
                                props.onAuthorized();
                                enqueueSnackbar(t('hiUser'));
                            }}
                        >
                            {
                                t(props.text || 'Login')
                            }
                        </AsyncButton>
                )
            }
        </AuthorizeContext.Consumer>
    );
}
