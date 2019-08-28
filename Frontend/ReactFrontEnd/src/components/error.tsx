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
import { red } from '@material-ui/core/colors';

interface IErrorProps extends Partial<RouteComponentProps> {
    message: string;
    code: string;
    actionText?: string;
    action?: () => Promise<void> | void;
}

const useStyles = makeStyles(
    createStyles({
        orangeAvatar: {
            margin: 10,
            color: '#fff',
            backgroundColor: red[700],
        },
    }),
);

export default function ErrorComponent(props: IErrorProps) {
    const { t } = useTranslation();
    const { message, code, actionText, action } = props;
    const errorTitle = t(message);
    const actionTextTitle = t(actionText || '');
    const classes = useStyles();

    return (
        <Container maxWidth='sm'>
            <Card>
                <CardHeader
                    avatar={<Avatar className={classes.orangeAvatar} aria-label='Error'>{code}</Avatar>}
                    title={errorTitle}
                    subheader={location.pathname}
                >
                </CardHeader>
                <CardContent>
                    <Typography>{errorTitle}</Typography>
                </CardContent>
                {
                    !!action && !!actionTextTitle
                        ? (<CardActions>
                            <Button
                                onClick={() => action()}
                                size='small'>
                                {actionTextTitle}
                            </Button>
                        </CardActions>)
                        : null
                }
            </Card>
        </Container>
    );
}
