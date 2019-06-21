import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import AuthorizeContext from '@bx-contexts/authorize.context';
import { useSnackbar } from 'notistack';
import AsyncButton from '@bx-components/async.button.component';

interface ILoginButtonProps {
    text?: string;
    onAuthorized: () => void;
}

export default function (props: ILoginButtonProps): JSX.Element {
    const [loading, loadingChanged] = React.useState(false);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <AuthorizeContext.Consumer>
            {
                value => (
                    value.isAuthorized
                        ? null
                        : <AsyncButton
                            disabled={loading}
                            onClick={async () => {
                                loadingChanged(true);
                                try {
                                    const { login } = await import('@bx-services/account');
                                    await login();
                                    props.onAuthorized();
                                    enqueueSnackbar(t('hiUser'));
                                    loadingChanged(false);
                                } catch {
                                    loadingChanged(false);
                                }
                            }}
                        >
                            {
                                loading
                                    ? t('Loading')
                                    : t(props.text || 'Login')
                            }
                        </AsyncButton>
                )
            }
        </AuthorizeContext.Consumer>
    );
}
