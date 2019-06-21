import * as React from 'react';
import AuthorizeContext from '@bx-contexts/authorize.context';
import LoginButton from '@bx-components/login.button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const unauthorizedAvatar = (
    <Avatar aria-label='Unauthorized'>U</Avatar>
);

export function ensureIsAuthorized<P>(Component: React.ComponentClass<P>): any {
    return (props: P): JSX.Element => {
        const { t } = useTranslation();

        return (
            <AuthorizeContext.Consumer>
                {
                    ({ isAuthorized, changeAuthorize }) => {
                        if (isAuthorized) {
                            return <Component {...props} />;
                        }

                        const notAuthorizedText = t('NotAuthorizedForThisAction');

                        return (
                            <Container maxWidth='sm'>
                                <Card>
                                    <CardHeader
                                        avatar={unauthorizedAvatar}
                                        title={notAuthorizedText}
                                        subheader={location.pathname}
                                    >
                                    </CardHeader>
                                    <CardContent>
                                        <Typography>{notAuthorizedText}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <LoginButton onAuthorized={() => { changeAuthorize(true); }} />
                                    </CardActions>
                                </Card>
                            </Container>
                        );
                    }
                }
            </AuthorizeContext.Consumer>
        );
    };
}
