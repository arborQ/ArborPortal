import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface I404Props extends Partial<RouteComponentProps> {
    message?: string;
    actionText?: string;
    action?: () => Promise<void> | void;
}

const useStyles = makeStyles(
    createStyles({
        orangeAvatar: {
            margin: 10,
            color: '#fff',
            backgroundColor: 'Red',
        },
    }),
);

export default function(props: I404Props) {
    const { t } = useTranslation();
    const errorTitle = t(props.message || 'Page does not exists');
    const classes = useStyles();

    return (
        <Container maxWidth='sm'>
            <Card>
                <CardHeader
                    avatar={<Avatar className={classes.orangeAvatar} aria-label='Error'>ER</Avatar>}
                    title={errorTitle}
                    subheader={location.pathname}
                >
                </CardHeader>
                <CardContent>
                    <Typography>{errorTitle}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => {
                            if (!!props.action) {
                                props.action();
                            } else if (!!props.history) {
                                props.history.replace('/');
                            } else {
                                throw new Error('No 404 action defined');
                            }
                        }}
                        size='small'>
                        {t(props.actionText || 'Rerurn to homepage')}
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
}
