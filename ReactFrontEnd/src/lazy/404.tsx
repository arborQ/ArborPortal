import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

interface I404Props extends Partial<RouteComponentProps> {
    message?: string;
    actionText?: string;
    action?: () => Promise<void> | void;
}

export default function (props: I404Props): JSX.Element {
    const { t } = useTranslation();

    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {t(props.message || 'Page does not exists')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => {
                        if (!!props.action) {
                            props.action();
                        } else if (!!props.history) {
                            props.history.replace('/');
                        }else {
                            throw 'No 404 action defined';
                        }
                    }}
                    variant="contained"
                    color="primary"
                    size="small">
                    {t(props.actionText || 'Rerurn to homepage')}
                </Button>
            </CardActions>
        </Card>
    );
}

