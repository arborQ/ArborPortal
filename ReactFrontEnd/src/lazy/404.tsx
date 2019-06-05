import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';

function translate(props: ITranslationsProps, key: string): string {
    if (props.translate === undefined) {
        return key;
    }

    return props.translate(key);
}

ensureTranslationsDecorator('shared')
export default function (props: ITranslationsProps): JSX.Element {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {translate(props, 'Page does not exists')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="small">{translate(props, 'Learn More')}</Button>
            </CardActions>
        </Card>
    );
}

