import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import AuthorizeContext from '@bx-contexts/authorize.context';

interface ILogoutButtonProps {
    text?: string;
    onUnauthorized: () => void;
}

export default function(props: ILogoutButtonProps): JSX.Element {
    const [ loading, loadingChanged ] = React.useState(false);
    const { t } = useTranslation();

    return (
        <AuthorizeContext.Consumer>
            {
                value => (
                    !value.isAuthorized 
                    ? null
                    : <Button
                        disabled={loading}
                        onClick={async () => {
                            loadingChanged(true);
                            try {
                                const { logout } = await import('@bx-services/account');
                                await logout();
                                props.onUnauthorized();
                                loadingChanged(false);
                            } catch{
                                loadingChanged(false);
                            }
                        }}
                    >
                        {
                            loading
                                ? t("Loading")
                                : t(props.text || "Logout")
                        }
                    </Button>
                )
            }
        </AuthorizeContext.Consumer>
    );
}
