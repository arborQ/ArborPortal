import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import AuthorizeContext from '@bx-contexts/authorize.context';

interface ILoginButtonProps {
    text?: string;
    onAuthorized: () => void;
}

export default function(props: ILoginButtonProps): JSX.Element {
    const [ loading, loadingChanged ] = React.useState(false);
    const { t } = useTranslation();

    return (
        <AuthorizeContext.Consumer>
            {
                value => (
                    value.isAuthorized
                    ? null
                    : <Button
                        disabled={loading}
                        onClick={async () => {
                            loadingChanged(true);
                            try {
                                const { login } = await import('@bx-services/account');
                                await login();
                                props.onAuthorized();
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
                    </Button>
                )
            }
        </AuthorizeContext.Consumer>
    );
}
