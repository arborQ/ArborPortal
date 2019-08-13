import * as React from 'react';
import { useTranslation } from 'react-i18next';
import AuthorizeContext from '@bx-contexts/authorize.context';
import { useSnackbar } from 'notistack';
import { ButtonProps } from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';

interface ILoginButtonProps extends ButtonProps {
}

export default function ExternalProviderLogin(props: ILoginButtonProps): JSX.Element {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <AuthorizeContext.Consumer>
            {
                value => (
                    value.isAuthorized
                        ? null
                        : <Button
                            {...props}
                            onClick={async () => {
                                try {
                                    const { login } = await import('@bx-services/account');
                                    await login();
                                    value.changeAuthorize(true);
                                    enqueueSnackbar(t('User logged in message'));
                                } catch {
                                    return Promise.resolve(false);
                                }
                            }}
                        />
                )
            }
        </AuthorizeContext.Consumer>
    );
}
