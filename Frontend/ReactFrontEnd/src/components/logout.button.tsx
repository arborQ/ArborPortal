import * as React from 'react';
import { useTranslation } from 'react-i18next';
import AuthorizeContext from '@bx-contexts/authorize.context';
import { useSnackbar } from 'notistack';
import AsyncButton from '@bx-components/async.button.component';

interface ILogoutButtonProps {
    text?: string;
    onUnauthorized: () => void;
}

export default function (props: ILogoutButtonProps): JSX.Element {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const abortController = new AbortController();

    return (
        <AuthorizeContext.Consumer>
            {
                value => (
                    !value.isAuthorized
                        ? null
                        : <AsyncButton
                            onClick={async () => {
                                    const { logout } = await import('@bx-services/account');
                                    await logout(abortController.signal);
                                    props.onUnauthorized();
                                    enqueueSnackbar(t('goodByeUser'));
                            }}
                        > { t(props.text || 'Logout') }
                        </AsyncButton>
                )
            }
        </AuthorizeContext.Consumer>
    );
}
